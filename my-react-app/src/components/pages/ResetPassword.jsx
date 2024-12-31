import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import FormRow from '../../FormRow';
import customFetch from '../../utils/customFetch';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
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
  const query = useQuery();

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!password) {
      showAlert({ text: 'Please enter password' });
      setLoading(false);
      return;
    }

    try {
      if(!password||password<6){
        toast.error("The number of password must be greater than 6  and must be exist.");
        return;
      }
      const passwordPattern = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,}/;

if (!passwordPattern.test(password)) {
toast.error("Password must include at least a number and a letter, and a symbol.");
return;
}
      const { data } = await customFetch.post('/auth/reset-password', {
        password,
        token: query.get('token'),
        email: query.get('email'),
      });

      setLoading(false);
      setSuccess(true);
      showAlert({
        text: `Success, redirecting to login page shortly`,
        type: 'success',
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  };

  return (
    <Wrapper className='page'>
      {alert.show && (
        <div  style={{padding:'40px',textAlign:'center'}}  className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {!success && (
        <form
          className={loading ? 'form form-loading' : 'form'}
          onSubmit={handleSubmit}
        >
          <h4>Reset Password</h4>
          <FormRow
            type='password'
            name='password'
            value={password}
            handleChange={handleChange}
          />
          <button type='submit' className='btn btn-block' disabled={loading}>
            {loading ? 'Please Wait...' : 'New Password'}
          </button>
        </form>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
`;

export default ResetPasswordForm;
