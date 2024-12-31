import React from 'react';
import { GrCubes, GrUserExpert } from "react-icons/gr";
import { HiLightBulb } from "react-icons/hi";
import img from '../../../../../../public/images/home1.jpg';
import './sec2.css';

const Sec2 = () => {
  return (
    <main className='main-second-section-content-home'>
        <div className='content-second-section-home'>
            <div className='img-second-section-content'>
                <div id='con-con-img-second-section-content'>
                    <img src={img} alt="" />
                </div>
            </div>
            <div className='content-text-second-section-home'>
                <h1>Pourquoi nous choisir</h1>
                <div className='img-second-section-content-small-size'>
                    <div id='con-con-img-second-section-content-small-size'>
                        <img src={img} alt="" />
                    </div>
                </div>
                <p>
                    First IFRST se distingue par son engagement envers l’excellence en formation, 
                    recherche et innovation. Nous offrons des solutions pratiques et adaptées aux 
                    besoins actuels des individus et des organisations, alliant savoir académique et 
                    expérience concrète.
                </p>
                <div className='benifits-second-section-text-home'>
                    <div id='benifit-text-content-second-home'>
                        <span><HiLightBulb/></span>
                        <div id='con-text-cont-beni-sec-home'>
                            <h3>Approche innovante</h3>
                            <p>Nous allions des méthodes de pointe à des solutions pratiques adaptées aux besoins du secteur.</p>
                        </div>
                    </div>
                    <div id='benifit-text-content-second-home'>
                        <span><GrUserExpert/></span>
                            <div id='con-text-cont-beni-sec-home'>
                                <h3>Formateurs experts</h3>
                                <p>Notre équipe est composée de professionnels expérimentés et passionnés.</p>
                            </div>
                    </div>
                    <div id='benifit-text-content-second-home'>
                        <span><GrCubes/></span>
                            <div id='con-text-cont-beni-sec-home'>
                                <h3>Solutions sur-mesure</h3>
                                <p>Nous adaptons nos services pour répondre aux objectifs spécifiques de chaque client.</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Sec2