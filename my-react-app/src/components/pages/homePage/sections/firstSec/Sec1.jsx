import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../../../../../public/images/home1.jpg';
import img2 from '../../../../../../public/images/home2.jpg';
import './sec1.css';

const Sec1 = () => {
  return (
    <main className='home-first-sec-main'>
        <div id='blue-shadow-screen1'></div>
        <div id='blue-shadow-screen2'></div>
        <div className='home-first-sec-main-content'>
            <div className='home-f-sec-content-fr'>
                <div className='content-sec-one-sec'>
                    <h1>first ifrest</h1>
                    <div className='mobile-images-first-section'>
                        <div id='first-point'></div>
                        <div id='second-point'></div>
                        <div id='third-point'></div>
                        <div id='fourth-point'></div>
                        <div id='home-f-sec-content-sc-ig-first-mobile'>
                            <div id='img1_home_first_sec_mobile'>
                                <img src={img1} alt="" />
                            </div>
                            <div id='img1_home_first_sec_mobile'>
                                <img src={img2} alt="" />
                            </div>
                        </div>
                        <div id='home-f-sec-content-sc-ig-second-mobile'>
                            <div id='img1_home_first_sec_mobile'>
                                <img src={img2} alt="" />
                            </div>
                            <div id='img1_home_first_sec_mobile'>
                                <img src={img1} alt="" />
                            </div>
                        </div>
                    </div>
                    <p>
                    L’Institut de Formations et de Recherches Scientifiques et Techniques (First IFRST) 
                    est une structure multidisciplinaire dédiée à l’excellence en formation, recherche 
                    et innovation. Il offre des services variés répondant aux besoins actuels des individus et organisations, avec un engagement à développer des solutions pratiques et innovantes.
                    </p>
                </div>
                <div className='content-sec-one-sec-btn'>
                    <Link to={'/sign_up'}>
                        <button id='content-sec-one-sec-btn-one'>inscription</button>
                    </Link>
                    <Link to={'/presentation'}>
                        <button id='content-sec-one-sec-btn-two'>presentation</button>
                    </Link>
                </div>
            </div>
            <div className='home-f-sec-content-sc-ig'>
                <div className='home-f-sec-content-sc-ig-content'>
                    <div id='first-point'></div>
                    <div id='second-point'></div>
                    <div id='third-point'></div>
                    <div id='fourth-point'></div>
                    <div id='fifth-point'></div>
                    <div id='sixth-point'></div>
                    <div id='seven-point'></div>
                    <div id='eight-point'></div>
                    <div id='home-f-sec-content-sc-ig-first'>
                        <div id='img1_home_first_sec'>
                            <img src={img1} alt="" />
                        </div>
                        <div id='img1_home_first_sec'>
                            <img src={img2} alt="" />
                        </div>
                    </div>
                    <div id='home-f-sec-content-sc-ig-second'>
                        <div id='img1_home_first_sec'>
                            <img src={img2} alt="" />
                        </div>
                        <div id='img1_home_first_sec'>
                            <img src={img1} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Sec1