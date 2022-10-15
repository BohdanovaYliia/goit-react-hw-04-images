import { useState, useEffect } from "react";
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import * as API from "../services/api";
import { Wraper, Text } from "./App.styled";


export function App() {
  const [request, setRequest] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPicture, setCurrentPicture] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const addPictures = async (request, page) => {
    try {
      setStatus('pending');
      const pictures = await API.loadPictures(request, page);

      setPictures(prevPictures => [...prevPictures, ...pictures]);
      setStatus('resolved');
    } catch (error) {
      setError(error.message);
      setStatus('rejected');
    }
  };

  useEffect(() => {
    if (request !== '') {
      addPictures(request, page)
    }
  }, [request, page])

  const onModalClose = (evt) => {
    evt.preventDefault();
    
    setCurrentPicture('');
  }

  const loadMore = () => {
    setPage(page => page + 1);
  }

  const handleSearchBarSubmit = newRequest => {
    if (request !== newRequest) {
      setRequest(newRequest);
      setPictures([]);
      setPage(1);
    }
  }

    return (
      <Wraper>
        <Searchbar onSubmit={handleSearchBarSubmit} />
        {status === 'idle' && <Text>Enter your request please</Text>}
        {status === 'rejected' && <Text>{error.message}</Text>}
        {status === 'resolved' && pictures.length === 0 && <Text>Sorry, no results were found for your search. Enter another request</Text>}
        {pictures.length > 0 && <ImageGallery pictures={pictures} onShowModal={setCurrentPicture} />}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && pictures.length > 0 && <Button onLoadMore={loadMore} />}
        {currentPicture && <Modal closeModal={onModalClose} url={currentPicture}/>}
      </Wraper>
    );
}
