import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

const Card = ({ course }) => {
  return (
    <main className='main-content-card-courses'>
      <div className='content-main-content-card-courses'>
        <div className='header-img-content-card-courses'>
        <img
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
    src={course.image}
    alt={course.name}
  />

        </div>
        <div className='middle-content-card-courses'>
          <div className='category-each-card-courses'>
            <h4>{course.category}</h4>
          </div>
          <div className='title-name-card-courses'>
            <h2>{course.title}</h2>
          </div>
          <p>{course.level}</p>
        </div>
        <div className='footer-content-card-courses'>
          <h5>{course.price}</h5>
          <Link to={`/course/${course._id}`}>
            <button>Buy</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Card;
