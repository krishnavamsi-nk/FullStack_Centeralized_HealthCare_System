import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={onClose}>
                            &times;
                        </span>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
