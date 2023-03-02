import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';


export const GalleryItem = ({item: {id, webformatURL, largeImageURL, tags}}) => {
    return (
        <Item> 
         <Image src={webformatURL} alt={tags} />   
         </Item>
    )
}
GalleryItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired
    }) 
}
    