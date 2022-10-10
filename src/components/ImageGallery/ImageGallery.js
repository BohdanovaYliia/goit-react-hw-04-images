import PropTypes from "prop-types";
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from "./ImageGallery.styled";

export const ImageGallery = ({ pictures, onShowModal }) => {

    return (
        <GalleryList>
            {pictures.map((picture) =>
                <ImageGalleryItem picture={picture} key={picture.id} onClick={onShowModal}/>
                )} 
        </GalleryList>
    );
}

ImageGallery.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.object),
    onShowModal: PropTypes.func.isRequired,
}