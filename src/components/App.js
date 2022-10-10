import { Component } from "react";
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import * as API from "../services/api";
import { Wraper, Text } from "./App.styled";


export class App extends Component {
  state = {
    request: '',
    pictures: [],
    page: 1,
    currentPicture: '',
    error: null,
    status: 'idle',
  }

  componentDidUpdate(_, prevState) {
    const prevRequest = prevState.request;
    const newRequest = this.state.request;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if(prevPage !== newPage || prevRequest !== newRequest) {
      this.addPictures(newRequest, newPage);
      }
  }

  addPictures = async (request, page) => {
    try {
      this.setState({
        status: 'pending',
      });
      const pictures = await API.loadPictures(request, page);
      
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...pictures],
        status: 'resolved'
      }));
    } catch (error) {
      this.setState({
        error: error.message,
        status: 'rejected'
      })
    }
  }

  onShowModal = (url) => {
    this.setState({
      currentPicture: url,
    })
  }

  onModalClose = () => {
    this.setState({
      currentPicture: '',
    })
  }

  loadMore = (evt) => {
    evt.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }


  handleSearchBarSubmit = request => {
    this.setState({ request, pictures: [], page: 1, });
  }

  render() {
    const { pictures, currentPicture, error, status } = this.state;

    return (
      <Wraper>
        <Searchbar onSubmit={this.handleSearchBarSubmit} />
        {status === 'idle' && <Text>Enter your request please</Text>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <Text>{error.message}</Text>}
        {status === 'resolved' && pictures.length === 0 && <Text>Sorry, no results were found for your search. Enter another request</Text>}
        {status === 'resolved' && pictures.length > 0 && <ImageGallery pictures={pictures} onShowModal={this.onShowModal} />}
        {status === 'resolved' && pictures.length > 0 && <Button onLoadMore={this.loadMore} />}
        {currentPicture && <Modal closeModal={this.onModalClose} url={currentPicture}/>}
      </Wraper>
    );
  }
}
