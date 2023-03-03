import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';


export class GalleryItem extends Component {
    state = {
        isOpen: false
    }
    // openModal = () => {
    //     this.setState({
    //         isOpen: true
    //     })
    // }
    // closeOn = () => {
    //     this.setState({
    //         isOpen: false
    //     })
    // }
    toggleModal = () => {
        this.setState(({isOpen}) => ({
            isOpen: !isOpen
        }))
    }
    render() {
       const {item: { webformatURL, largeImageURL, tags}} = this.props
       return (
        <div>
        <Item> 
         <Image src={webformatURL} alt={tags} onClick={this.toggleModal} />   
         </Item>
        {this.state.isOpen && <Modal tags={tags} large={largeImageURL} onClose={this.toggleModal} />}
        </div>
    ) 
    }
    
}



GalleryItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired
    }) 
}
    