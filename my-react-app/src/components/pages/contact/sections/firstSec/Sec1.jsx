import React from 'react';
import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";
import img from '../../../../../../public/images/classroom.jpg';
import './sec1.css';
const Sec1 = () => {
  return (
    <main className='main-content-contact-page'>
        <div className='content-con-contact'>
            <div className='content-full-text-first-contact'>
                <div className='con-text-contact-first-sec'>
                    <h1>Contactez-nous</h1>
                    <p>
                    Nous sommes à votre écoute pour répondre à toutes vos questions. Remplissez le 
                    formulaire ci-dessous et notre équipe vous contactera dans 
                    les plus brefs délais pour vous fournir toute l'aide nécessaire.
                    </p>
                </div>
            </div>
            <div className='contect-addr-con-contact-sec-section'>
                <div className='netw-con-sec-contact'>
                    <div className='netw-con-sec-contact-content'>
                        <div id='con-contact-net'>
                            <span><BiLogoGmail/></span>
                        </div>
                    </div>
                        <p>email@gmail.com</p>
                </div>
                <div className='netw-con-sec-contact'>
                    <div className='netw-con-sec-contact-content'>
                        <div id='con-contact-net'>
                            <span><FaWhatsapp/></span>
                        </div>
                    </div>
                        <p>+213 77 77 77 77</p>
                </div>
                <div className='netw-con-sec-contact'>
                    <div className='netw-con-sec-contact-content'>
                        <div id='con-contact-net'>
                            <span><MdPhoneInTalk/></span>
                        </div>
                    </div>
                        <p>07 XX XX XX XX</p>
                </div>
            </div>
            <div className='content-img-con-contact-os-section'>
                <img src={img} alt="" />
            </div>
        </div>
    </main>
  )
}

export default Sec1