import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, url, tags, openModal }) => {
    return (
        <li className={css.imageGalleryItem} onClick={() => openModal(id)} >
            <img className={css.imageGalleryItemImage} src={url} alt={tags} />
        </li> 
    )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
}