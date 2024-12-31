import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import './form.css'
const FormContact = () => {
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [subject, setSubject] = useState();
    const [fullName, setFullName] = useState()
    const [message, setMessage] = useState();
    const sendMail = () => {
        axios.get("http://localhost:5000/sendEmail", {
            params: {
              email,
              subject,
              phoneNumber,
              fullName,
              message,
            },
          })
          .then(() => {
            //success
            toast.success("success send email");
          })
          .catch((error) => {
            console.log(error)
            toast.error("failure to send email ");
          });
      };
      const handleSubmit=(e)=>{
        e.preventDefault()
      }
  return (
    <main className='form-contact-con'>
        <div className='content-form-contact-con'>
            <div className='header-content-contact-form'>
                <h1>
                  Contactez-nous
                </h1>
                <p>
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                </p>
            </div>
            <div className='form-contact-page'>
            <form onSubmit={handleSubmit} className='form-form-contact'>

                    <label htmlFor="">name</label><br/>
                    <input type='text' name='username' onChange={(e)=>setFullName(e.target.value)} /><br/>
                    <label htmlFor="">email</label><br/>
                    <input type='email' name='email' onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="">phone</label><br/>
                    <input type='tel' name='phone-number' onChange={(e) => setPhoneNumber(e.target.value)} />
                    <label htmlFor="">subject</label><br/>
                    <input
        type='text'
        onChange={(e) => setSubject(e.target.value)}
      />
                    <label htmlFor="">message</label><br/>
                    <textarea name='message' onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button
                     style={{
                        backgroundColor: '#6d8def', // Green background
                        color: 'white',            // White text
                        padding: '10px 20px',      // Padding inside the button
                        border: 'none',            // Remove border
                        borderRadius: '5px',       // Rounded corners
                        cursor: 'pointer',         // Pointer cursor on hover
                        fontSize: '16px',          // Font size
                      }}
                    type='submit' onClick={sendMail}>send</button>
                </form>
            </div>
        </div>
    </main>
  )
}

export default FormContact