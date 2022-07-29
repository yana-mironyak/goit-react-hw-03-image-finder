import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() { 
        window.removeEventListener('keydown', this.handleKeyDown)
    }
    
    handleKeyDown = evt => {
        if(evt.code === 'Escape') {this.props.closeModal()}
    }
    
    handleClick= (evt) => {
        if (evt.currentTarget === evt.target) { this.props.closeModal() }
  }
    
    render() {
        const { largeImgUrl, tag } = this.props;
        return createPortal(
            <div className={css.overlay} onClick={this.handleClick}>
                <div className={css.modal}>
                    <img src={largeImgUrl} alt={tag} />
                </div>
            </div>,
            modalRoot,
        )
    }    
}

Modal.propsTypes = {
    largeImgUrl: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
}

