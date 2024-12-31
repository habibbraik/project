import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from './loading/Loader';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

const PrivateRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state

    async function fetchUser() {
        try {
            const response = await customFetch('/users/showMe');
            setUser(response.data.user);
        } catch (error) {
            console.error(error);
            toast.error('Failed to authenticate. Please log in again.');
        } finally {
            setLoading(false); // Set loading to false after attempt
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return <div style={{ height: '100vh', display:'flex' , alignItems:'center' , justifyContent:'center',background:'white' }}><Loader/></div>; // Show loading indicator
    }

    if (!user) {
        return <Navigate to='/login' />; // Redirect to login if no user found
    }

    if (user.role !== 'admin') {
        toast.error('You cannot access this route');
        return <Navigate to='/login' />;
    }

    return children;
};

export default PrivateRoute;
