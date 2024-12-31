import React from 'react'
import img from '../../../../../../public/images/creative.jpg'
import "./second.css"
const Second = () => {
  return (
    <div className='main-second-presentation'>
        <div className='content-main-second-presentation'>
            <div className='para-content-second-presentation'>
                <h1>présentation Générale</h1>
                <p>
                    Parce qu'elle propose des programmes d'éducation et de formation innovants,
                    soigneusement conçus pour répondre aux besoins des individus et des institutions,
                    le tout sous la supervision d'un groupe d'experts spécialisés possédant une expérience approfondie et une passion 
                    pour le développement des compétences.<br/><br/>
                    Ces programmes offrent des services complets et intégrés allant de la formation académique 
                    aux applications pratiques et aux consultations ciblées, 
                    avec une flexibilité qui permet de concevoir des solutions adaptées 
                    aux objectifs de chaque stagiaire ou organisation.
                </p>
            </div>
            <div className='img-second-presentation'>
                <img src={img} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Second