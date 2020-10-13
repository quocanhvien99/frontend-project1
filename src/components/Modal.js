import React from 'react';
import './Modal.css';

const Modal = ({ content, isActive, setModel }) => {
    const closeHandler = () => {
        setModel({isActive: false});
    }
    return (
        <div className={isActive?'Modal Modal-active':'Modal'}>
            <div className="container">
                <div className="content">{content}</div>
                <div className="close-btn" onClick={closeHandler}>X</div>
            </div>            
        </div>
    )
}

export default Modal;