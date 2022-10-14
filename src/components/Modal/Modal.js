import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export function Modal({ closeModal, url }) {    

    const handleBackdropClick = evt => {
        if(evt.currentTarget === evt.target) {
            closeModal(evt);
        }
    }

    useEffect(() => {
        const handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            closeModal(evt);
        }
        }
        
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [closeModal])

    return createPortal(
        <Overlay onClick={handleBackdropClick}>
            <ModalWindow>
                <img src={url} alt="" />
            </ModalWindow>
        </Overlay>,
        modalRoot
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
};