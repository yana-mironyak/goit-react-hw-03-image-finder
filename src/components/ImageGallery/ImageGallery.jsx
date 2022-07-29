import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import css from '../ImageGallery/ImageGallery.module.css';


const ImageGallery = ({imageGallery, openModal}) => {
    return (
    <ul className={css.imageGallery}>
            {imageGallery.map(({ id, webformatURL, tags }) => <ImageGalleryItem id={id} key={id} url={webformatURL} tags={tags} openModal={openModal} />)}
        </ul>
    )   
}

export default ImageGallery;

ImageGallery.propTypes = {
    imageGallery: PropTypes.arrayOf(PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
    })),
}