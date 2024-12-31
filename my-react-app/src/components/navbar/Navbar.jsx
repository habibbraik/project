import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';
import './navbar.css';
import Sidebar from "./sidebar/Sidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const [navBg, setNavBg] = useState(false);
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

  return (
    <>
    <div className={navBg ? 'header scrolled' : 'header'}>
      <nav className="navbar">
        <a href="/" className="logo">
          <img src={''} alt="logo" />
        </a>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/presentation">Presentation</Link>
          </li>
          <li className="nav-item dropdown">
            <Link to="/cours" id="dropdown-course">
            <div className='nav-arr-drop'>
              Courses
              <IoIosArrowDown/>
            </div>
            </Link>
            <ul className="dropdowns-menu">
              <li>
                <Link to="/cours/élève">Élève</Link>
              </li>
              <li>
                <Link to="/cours/étudiant">Étudiant</Link>
              </li>
              <li>
                <Link to="/cours/professionnel">Professionnel</Link>
              </li>
              <li>
                <Link to="/cours/doctorat">Doctorat</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <Link to="#">
            <div className='nav-arr-drop'>
              Galerie
              <IoIosArrowDown/>
            </div>
            </Link>
            <ul className="galerie-dropdown">
              <li>
                <Link to="/photo">Photo</Link>
              </li>
              <li>
                <Link to="/video">Video</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {user ? (
          <div>
            {user?.role === 'admin' ? (
    <div style={{ display: 'flex',  columnGap: '16px', justifyContent: 'end'}}>
              <div className="registration-button-navbar">
                <Link to="/ajouteformation">
                  <button>Dashboard</button>
                </Link>
              </div>
                   <div className="registration-button-navbar">
                      <button onClick={logoutUser}>Déconnecter</button>
                 </div>
                 </div>
            ) : (
              <div className="registration-button-navbar">
                <Link to="#">
                  <button>{user.name}</button>
                </Link>
              </div>
            )}


          </div>
        ) : (
          <>
          <div style={{ display: 'flex', columnGap: '16px', justifyContent:'end' }}>
            <div className="registration-button-navbar">
              <Link to="/sign-in">
                <button className="contact-nav">Se connecter</button>
              </Link>
            </div>
            <div className="registration-button-navbar">
              <Link to="/sign_up">
                <button>S'inscrire</button>
              </Link>
            </div>
            </div>
          </>
        )}
      </nav>
    </div>
    <div className='sidebar'>
      <Sidebar/>
    </div>
    </>
  );
};

export default Navbar;
