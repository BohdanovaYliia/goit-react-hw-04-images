import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const API_KEY = "29439208-f38af98baaba958e5883525eb";
const settings = "image_type=photo&orientation=horizontal&per_page=12";

export const loadPictures = async (request, page) => {
    const response = await axios.get(`?q=${request}&page=${page}&key=${API_KEY}&${settings}`);
    const pictures = response.data.hits.map(picture => {
        const {id, largeImageURL, webformatURL, tags } = picture;
        return {
          id,
          largeImageURL,
          webformatURL,
          tags,
        }})
    return pictures;
};