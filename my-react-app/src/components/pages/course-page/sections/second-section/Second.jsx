import React from 'react';
import './second.css';

const Second = ({ description }) => {
  return (
    <main className='main-content-second-single-course'>
        <div className='content-section-description-single-course'>
            <h1>description</h1>
            <p>{description}</p> {/* Dynamically display the course description */}
        </div>
    </main>
  );
};

export default Second;
