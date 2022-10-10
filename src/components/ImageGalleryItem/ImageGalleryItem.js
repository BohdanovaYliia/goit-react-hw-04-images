import { GalleryItem, GalleryItemImg } from "./ImageGalleryItem.styled";
import PropTypes from "prop-types";

export const ImageGalleryItem = ({ picture:  { id, webformatURL, largeImageURL, tags }, onClick }) => {

    return (
        <GalleryItem>
            <GalleryItemImg src={webformatURL} alt={tags} onClick={() => onClick(largeImageURL)}/>
        </GalleryItem>
    );
}

ImageGalleryItem.propTypes = {
    picture: PropTypes.exact({
        id: PropTypes.number,
        webformatURL: PropTypes.string,
        tags: PropTypes.string,
        largeImageURL: PropTypes.string,
    }),
    onClick: PropTypes.func.isRequired,
};