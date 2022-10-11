import { GalleryItem, GalleryItemImg } from "./ImageGalleryItem.styled";
import PropTypes from "prop-types";

export const ImageGalleryItem = ({ picture:  { webformatURL, largeImageURL, tags }, onClick }) => {

    return (
        <GalleryItem>
            <GalleryItemImg src={webformatURL} alt={tags} onClick={() => onClick(largeImageURL)}/>
        </GalleryItem>
    );
}

ImageGalleryItem.propTypes = {
    picture: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
};