import React from 'react';
import { FaFacebookF, FaInstagram, FaViber, FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './location.css';

const Location = () => {
  return (
    <main className='main-location-contact'>
        <div className='content-main-location-contact'>
            <div className='header-content-location-contact'>
                <h1>
                    Our location
                </h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>
            <div className='maps-content-location-contact'>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167068.50852674356!2d3.041077567806794!3d36.786765915937984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e52737295bead%3A0x3e67233041c45558!2sSoci%C3%A9t%C3%A9%20Alg%C3%A9rienne%20des%20Foires%20et%20Exportations%20-%20Foire%20d&#39;Alger!5e0!3m2!1sfr!2sdz!4v1727893348657!5m2!1sfr!2sdz" 
                    width="555" 
                    height="360" 
                    style={{ border: 0, borderRadius: '20px' }} 
                    allowfullscreen="" 
                    loading="lazy" 
                    
                    // referrerpolicy="no-referrer-when-downgrade"
                >
                </iframe>
            </div>
            <div className='maps-content-location-contact-small-screen'>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167068.50852674356!2d3.041077567806794!3d36.786765915937984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e52737295bead%3A0x3e67233041c45558!2sSoci%C3%A9t%C3%A9%20Alg%C3%A9rienne%20des%20Foires%20et%20Exportations%20-%20Foire%20d&#39;Alger!5e0!3m2!1sfr!2sdz!4v1727893348657!5m2!1sfr!2sdz" 
                    width="auto" 
                    height="400" 
                    style={{ border: 0, borderRadius: '20px' }} 
                    allowfullscreen="" 
                    loading="lazy" 
                    
                    // referrerpolicy="no-referrer-when-downgrade"
                >
                </iframe>
            </div>
            <div className='content-social-media-location-contact'>
                <h1>social media</h1>
                <div className='social-content-location-contact'>
                    <Link to={""}>
                        <div id='social-icon-link-contact'>
                            <FaFacebookF/>
                        </div>
                    </Link>
                    <Link to={''}>
                        <div id='social-icon-link-contact'>
                            <FaWhatsapp/>
                        </div>
                    </Link>
                    <Link to={''}>
                        <div id='social-icon-link-contact'>
                            <FaInstagram/>
                        </div>
                    </Link>
                    <Link to={''}>
                        <div id='social-icon-link-contact'>
                            <FaViber/>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Location