import { createPortal } from "react-dom";
import { Component } from "react";
import { Backdrop, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.keyDownEvent)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDownEvent)
    }

    keyDownEvent = e => {
        if(e.code === 'Escape') {
            this.props.onClose()
        }
    }
    onCloseBackdrop = e => {
        if(e.currentTarget === e.target) {
            this.props.onClose()
        }
    }
    render() {
        const {tags, large} = this.props
        return (
            createPortal(<Backdrop onClick={this.onCloseBackdrop}>
            <ModalWindow>   
                <img src={large} alt={tags} />
            </ModalWindow>
            </Backdrop>, modalRoot)
            ) 
    }
    
        
}