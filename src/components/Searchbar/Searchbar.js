import { Component } from "react";
import Notiflix from 'notiflix';
import { FormWrap, SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchFormInput } from "./Searchbar.styled";

export class Searchbar extends Component {
    state = {    
        request: '',
    }

    handleRequestChange = evt => {
        this.setState({request: evt.currentTarget.value.toLowerCase()});
    }

    handleSubmit = evt => {
        evt.preventDefault();

        if (this.state.request.trim() === '') {
            Notiflix.Notify.failure('Enter your request!');
            return;
        }
        this.props.onSubmit(this.state.request);
        this.setState({ request: ''} );
    }

    render() {
    return (
        <FormWrap>
            <SearchForm onSubmit={this.handleSubmit}>
                <SearchFormBtn type="submit">
                    <SearchFormBtnLabel>Search</SearchFormBtnLabel>
                </SearchFormBtn>

                <SearchFormInput
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={this.state.request}
                    onChange={this.handleRequestChange}
                />
            </SearchForm>
        </FormWrap>
    );
  }
}