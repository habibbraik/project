import React from 'react'
import img from '../../../../../../public/images/home3.jpg'
import './fourth.css'
const Fourth = () => {
  return (
    <main className='main-section-four-home-page'>
        <div className='content-main-section-four-home-page'>
            <div className='cote-section-information'>
                <h2>Engagements<br/> et <span>valeurs</span></h2>
                <div className='numero-valeur-section-four-home-page'>
                    <div className='numero-section-four-home-page number-one'>
                        <div className='number-title-each-line'>
                            <h1>01</h1>
                        </div>
                        <div className='content-numero-section'>
                            <h4>Excellence</h4>
                            <p>Offrir des services de qualité supérieure.</p>
                        </div>
                    </div>
                    <div className='numero-section-four-home-page number-two'>
                        <div className='number-title-each-line'>
                            <h1>02</h1>
                        </div>
                            <div className='content-numero-section'>
                                <h4>Innovation</h4>
                                <p>S'appuyer sur les dernières avancées technologiques.</p>
                            </div>
                        </div>
                    <div className='numero-section-four-home-page number-three'>
                        <div className='number-title-each-line'>
                            <h1>03</h1>
                        </div>
                            <div className='content-numero-section'>
                                <h4>Éthique</h4>
                                <p>Respect des principes déontologiques et des besoins spécifiques.</p>
                            </div>
                        </div>
                </div>
            </div>
            <div className='second-cote-image-represent'>
                <img src={img} alt="" />
            </div>
        </div>
    </main> 
  )
}

export default Fourth