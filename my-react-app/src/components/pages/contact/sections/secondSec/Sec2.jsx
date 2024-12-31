import React from 'react'
import FormContact from './items/FormContact'
import Location from './items/Location'
import './sec2.css'

const Sec2 = () => {
  return (
    <main className='main-third-contact-section'>
        <div className='content-main-third-contact-section'>
            <div>
                <FormContact/>
            </div>
            <div>
                <Location/>
            </div>
        </div>
    </main>
  )
}

export default Sec2