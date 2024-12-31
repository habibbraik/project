import React from 'react';
import './Modal.css';

const ImageModal = ({ show, onClose, imgSrc }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='image-modal-overlay' onClick={onClose}>
      <div className='image-modal'>
        <img src={imgSrc} alt='Enlarged' />
      </div>
    </div>
  );
};

export default ImageModal;
