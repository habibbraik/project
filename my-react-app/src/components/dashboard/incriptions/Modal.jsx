import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import ImageModal from './ImageModal';
import './Modal.css';

const Modal = ({ show, onClose, student }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');

  const handleImageClick = (imgSrc) => {
    setSelectedImg(imgSrc);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedImg('');
  };

  if (!show) {
    return null;
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='closing-modal-all' onClick={onClose}><ImCross /></button>
        <div className='modal-content'>
          {student ? (
            <>
              <div className='per-names-det'>
                <h2>{student.name}</h2>
                <h2>{student.firstName}</h2>
              </div>
              <div className='inf-det-per'>
                <div className='inf_det_per_content'>
                  <div className='life-per-det'>
                    <h3><strong>Pays:</strong> {student.country}</h3>
                    <h3><strong>Ville:</strong> {student.city}</h3>
                  </div>
                  <h3><strong>Formation:</strong> {student.levelOfStudy}</h3>
                  <h3><strong>Spécialité:</strong> {student.specialty}</h3>
                  <h3><strong>Profession:</strong> {student.occupation}</h3>
                  <h3><strong>Email:</strong> {student.email}</h3>
                </div>
                <div className='carte-img-nat'>
                  <div className='carte-img-nat-two'>
                    <img src={student.image} alt='' onClick={() => handleImageClick(student.image)} />
                  </div>
                  <div className='carte-img-nat-two'>
                    <img src={student.image1} alt='' onClick={() => handleImageClick(student.image1)} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <ImageModal show={showImageModal} onClose={handleCloseImageModal} imgSrc={selectedImg} />
      </div>
    </div>
  );
};

export default Modal;
