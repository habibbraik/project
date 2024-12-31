import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormRow from '../../FormRow';
import customFetch from '../../utils/customFetch';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    text: '',
    type: 'danger',
  });
const [success, setSuccess] = useState(false);
const showAlert = ({ text, type = 'danger' }) => {
    setAlert({ show: true, text, type });
  };
  const hideAlert = () => {
    setAlert({ show: false, text: '', type: 'danger' });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    hideAlert();
    if (!email) {
      showAlert({
        text: 'Please provide email',
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await customFetch.post('/auth/forgot-password', {
        email,
      });
      showAlert({ text: data.msg, type: 'success' });
      setSuccess(true);
    } catch (error) {
      showAlert({
        text: 'Something went wrong, please try again',
      });
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className='page'>
      {alert.show && (
        <div  style={{padding:'40px',textAlign:'center'}}  className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {!success && (
        <form
          className={'form'}
          onSubmit={handleSubmit}
        >
          <h4>Forgot password</h4>

<br/>
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={handleChange}
          />

          <button type='submit' className='btn btn-block' disabled={loading}>
            {loading ? 'Please Wait...' : 'Get Reset Password Link'}
          </button>
          <br/><br/><br/>
          <p >
            Already have an account?
            <Link to='/login' className='login-link'>
              Log In
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

const Wrapper = styled.main`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
`;

export default ForgotPassword;
