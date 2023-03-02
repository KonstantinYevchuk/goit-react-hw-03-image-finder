import PropTypes from 'prop-types';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({items}) => {
    return (
        <GalleryList>
        {items.map(item => 
        <GalleryItem key={item.id} item={item}/>)}
        </GalleryList>
    )
}

ImageGallery.propTypes = {
    items: PropTypes.array.isRequired,
}