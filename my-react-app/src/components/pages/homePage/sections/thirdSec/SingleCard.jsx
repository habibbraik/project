import React, { useState } from 'react';
import { FaChild } from "react-icons/fa";
import { IoHardwareChipSharp } from "react-icons/io5";
import { PiGraphDuotone, PiStudentBold } from "react-icons/pi";
import { Link } from 'react-router-dom';
import './singleCard.css';

const SingleCard = ({data}) => {
    const [readMoreState, setReadMoreState] = useState({});
    
    
    const toggleReadMore = (id) => {
    setReadMoreState((prevState) => ({
        ...prevState,
        [id]: !prevState[id]
        }));
    };
  return (
    <main className='main-single-card-third-section-home'>
        <div className='content-single-card-home-page'>
                {data.map((item)=>{
                    const{_id , level , name , category , description} = item;
                    const isReadMore = readMoreState[_id];
                    return(
                        <div className='card-card-home' key={_id}>
                            <div className='icon-space-card-home'>
                                {level === 'professionnel' ?(
                                    <IoHardwareChipSharp/>
                                ):(
                                    <span></span>
                                )}
                                {level === 'élève' ?(
                                    <FaChild/>
                                ):(
                                    <span></span>
                                )}
                                {level === 'étudient' ?(
                                    <PiStudentBold/>
                                ):(
                                    <span></span>
                                )}
                                {level === 'doctorat' ?(
                                    <PiGraphDuotone/>
                                ):(
                                    <span></span>
                                )}
                            </div>
                            <div className='content-text-single-card-home'>
                                    <h2>
                                        {name}
                                    </h2>
                                    <p>
                                        {description}
                                    </p>
                            </div>
                            <Link to={`/course/${_id}`}>
                                <button>voir plus</button>
                            </Link>
                        </div>
                    )
                })}
        </div>
    </main>
  )
}

export default SingleCard