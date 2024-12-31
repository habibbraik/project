import React, { useEffect, useState } from 'react';
import { HiOutlineMenu } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../../../context';
import customFetch from '../../../utils/customFetch';
import './sidebar.css'; // Add custom styles for the sidebar

const Sidebar = () => {
    const navigate = useNavigate();

        const {  handleLevelChange } = useGlobalContext();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logoutUser = async () => {
      try {
        await customFetch.get('/auth/logout');
        toast.success('Logged out successfully');
        navigate('/sign_in');
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Error logging out');
      }
    };

    const fetchUser = async () => {
      try {
        const response = await customFetch('/users/showMe');
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (!user) fetchUser();
    }, [user]);

    useEffect(() => {
      const changeNavBg = () => {
        setNavBg(window.scrollY > 450);
      };
      window.addEventListener('scroll', changeNavBg);
      return () => window.removeEventListener('scroll', changeNavBg);
    }, []);

    if (loading) {
      return (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
          }}
        >
          <div>Loading...</div>
        </div>
      );
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
        {/* Button to toggle sidebar */}
        <div className='par-button-toggle-sidebar'>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
              <HiOutlineMenu/>
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header">
            <img src="" alt="Logo" className="sidebar-logo" />
            <button className="close-btn" onClick={toggleSidebar}>
                &times;
            </button>
            </div>

            <ul className="sidebar-menu">
            <li>
                <Link to="/" onClick={toggleSidebar}>Home</Link>
            </li>
            <li>
                <Link to="/presentation" onClick={toggleSidebar}>Presentation</Link>
            </li>
            <li>
            <div className="dropdown">
                <Link to="/cours" className="dropdown-toggle" onClick={toggleSidebar}>
                  <div className='child-dropdown-toggle'>
                    Cours <IoIosArrowDown/>
                  </div>
                </Link>
                  <ul className="dropdown-menu">
                    <Link to="/cours/élève" onClick={() => handleLevelChange('élève')} >
                      <li>Élève</li>
                    </Link>
                    <Link to="/cours/étudiant"  onClick={() => handleLevelChange('étudiant')}>
                      <li >Étudiant</li>
                    </Link>
                    <Link to="/cours" >
                      <li onClick={() => handleLevelChange('Professionnel')}>professionnel</li>
                    </Link>
                    <Link to="/cours" >
                      <li onClick={() => handleLevelChange('Doctorat')}>doctorat</li>
                    </Link>
                  </ul>
            </div>
            </li>
            <li>
                <div className="dropdown">
                <Link to="/photo" className="dropdown-toggle" onClick={toggleSidebar}>
                <div className='child-dropdown-toggle'>
                    Galerie <IoIosArrowDown/>
                  </div>
                </Link>
                <ul className="dropdown-menu">
                    <li><Link to="/photo" onClick={toggleSidebar}>Photo</Link></li>
                    <li><Link to="/video" onClick={toggleSidebar}>Video</Link></li>
                </ul>
                </div>
            </li>
            <li>
                <Link to="/contact" onClick={toggleSidebar}>Contact</Link>
            </li>
            {/* <li>
                <Link to="/sign_in" className="register-btn" onClick={toggleSidebar}>
                Sign Up
                </Link>
            </li> */}
             {user ? (
          <div>
            {user?.role === 'admin' ? (
<>
                <Link to="/ajouteformation" className="register-btn" >
             Dashboard
                </Link>
                  <Link to="/sign_in" className="register-btn"   onClick={logoutUser}>
        Déconnecter
               </Link>
</>

            ) : (
<>
                <Link

                to="#" className="register-btn" >
                {user.name
                }
                </Link>
                  <Link to='/sign_in' className="register-btn"   onClick={logoutUser}>
        Déconnecter
               </Link>
</>

            )}

          </div>
        ) : (
          <>

              <Link to="/sign_in" className="register-btn" >
                Se connecter
              </Link>

              <Link to="/sign_up" className="register-btn" >
                S'inscrire
              </Link>

          </>
        )}
            </ul>
        </aside>
        </>
    );
};

export default Sidebar;
