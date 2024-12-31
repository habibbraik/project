import React from 'react';
import { ImCross } from 'react-icons/im';
import './third.css';

const Third = ({ schedule }) => {
  return (
    <main className='main-third-section-timing-single-course'>
      <div className='content-main-third-section-timing-single-course'>
        <h1>plan du cours</h1>
        <div className='planing-section-single-course'>
          <div className='day-timing-table'>
            <p id='p-nes-plan'>jours</p>
            {schedule.map((item, index) => (
              <p key={index}>{item.day}</p>  // Dynamically render days
            ))}
          </div>
          <div className='time-timing-table'>
            <p id='p-nes-plan'>temps</p>
            {schedule.map((item, index) => (
              <p key={index}>
            {item.startTime === '00:00' && item.endTime == '00:00' ? (
              <span><ImCross/></span>
            
            ):(
              <>
                <span>{item.startTime}</span>-<span>{item.endTime}</span>
              </>

            )}
              </p> // Dynamically render start and end times
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Third;
