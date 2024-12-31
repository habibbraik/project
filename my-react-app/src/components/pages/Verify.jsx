import  { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import customFetch from '../../utils/customFetch';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };
  const fetchUser = async () => {
    try {
      const { data } = await customFetch.get(`/users/showMe`);
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const verifyToken = async () => {
    setLoading(true);
    try {
      const { data } = await customFetch.post('/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
  }, [isLoading]);

  if (loading) {
    return (
      <section className="page2">
        <h2>Loading...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page2">
        <h4 className="error2">There was an error, please double check your verification link</h4>
      </section>
    );
  }

  return (
    <section className="page2">
      <h2>Account Confirmed</h2>
      <Link to='/sign_in' className="btn2">
        Please login
      </Link>
    </section>
  );
};

export default VerifyPage;