import { useState } from "react";
import Notiflix from 'notiflix';
import { FormWrap, SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchFormInput } from "./Searchbar.styled";
import PropTypes from "prop-types";

export function Searchbar({ onSubmit }) {
    const [request, setRequest] = useState('');

    const handleRequestChange = evt => {
        const { value } = evt.currentTarget;
        setRequest(value.toLowerCase());
    }

    const handleSubmit = evt => {
        evt.preventDefault();

        if (request.trim() === '') {
            Notiflix.Notify.failure('Enter your request!');
            return;
        }
        onSubmit(request);
    }

    return (
        <FormWrap>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormBtn type="submit">
                    <SearchFormBtnLabel>Search</SearchFormBtnLabel>
                </SearchFormBtn>

                <SearchFormInput
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={request}
                    onChange={handleRequestChange}
                />
            </SearchForm>
        </FormWrap>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};