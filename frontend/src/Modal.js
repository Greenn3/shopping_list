// src/Modal.js
import React from 'react';
import './App.css'; // optional: style separately

export default function Modal({ onClose, children }) {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
}
