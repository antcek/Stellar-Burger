import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink,useLocation } from 'react-router-dom';
import OrderDetails from '../order-details/order-details';

function Modal({ onCloseModal, children }) {

    const location = useLocation();
    
    useEffect(() => {
           
        function modalEscClose(event) {

            if (event.code === 'Escape')
                onCloseModal();

        };

        if (location.pathname === '/' ) {
            onCloseModal()
        }

        document.addEventListener('keydown', modalEscClose);

        return () => {
            document.removeEventListener('keydown', modalEscClose)
        }

    }, [onCloseModal,children]);

    return ReactDOM.createPortal(
        <>
            <div className={styles.wrapper}>
                <NavLink to='/'>
                    <div onClick={onCloseModal} className={styles.close}>
                        <CloseIcon type="primary" />
                    </div>
                </NavLink>
                {children}


            </div>
            <ModalOverlay onCloseModal={onCloseModal} />
        </>,
        document.getElementById("react-modals")
    )
}

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal