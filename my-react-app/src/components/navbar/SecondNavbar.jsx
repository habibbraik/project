import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../../context';
import customFetch from '../../utils/customFetch';
import Loader from '../loading/Loader';
import "./navbar.css";
import Sidebar from './sidebar/Sidebar';
const SecondNavbar = () => {
    const [click, setClick] = useState(false);
    const navigate = useNavigate();
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


const { handleLevelChange } = useGlobalContext();

    const handleClick = () => setClick(!click);
    const closeMenu = () => setClick(false);

    if (loading) {
        return (
          <div
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
              overflow:"hidden"
            }}
          >
            <Loader/>
          </div>
        );
      }
    return (
        <>
        <div className='header scrolled'>
            <nav className='navbar'>
                <a href='/' className='logo'>
                    <img src={''} alt='logo' />
                </a>
                {/* <div className='hamburger' onClick={handleClick}>
                    {click ? (
                        <FaTimes size={30} style={{ color: '#ffffff' }} />
                    ) : (
                        <FaBars size={30} style={{ color: '#ffffff' }} />
                    )}
                </div> */}
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={"/presentation"}>Presentation</Link>
                    </li>
                    <li className='nav-item dropdown'>
                        <Link onClick={() => handleLevelChange('All')} to={'/cours'} id='dropdown-course'>
                          <div className='nav-arr-drop'>
                            Courses
                            <IoIosArrowDown/>
                          </div>
                        </Link>
                        <ul className='dropdowns-menu'>
                          <Link to="/cours/élève">  <li onClick={() => handleLevelChange('élève')}>Élève</li></Link>
                          <Link to="/cours/étudiant">     <li onClick={() => handleLevelChange('étudient')}>Étudiant</li></Link>
                          <Link to="/cours/professionnel">     <li onClick={() => handleLevelChange('professionnel')}>professionnel</li></Link>
                          <Link to="/cours/doctorat">     <li onClick={() => handleLevelChange('doctorat')}>doctorat</li></Link>
                        </ul>
                    </li>
                    <li className='nav-item dropdown'>
                        <Link to={'#'}>
                          <div className='nav-arr-drop'>
                            Galerie
                            <IoIosArrowDown/>
                          </div>
                        </Link>
                        <ul className='galerie-dropdown'>
                            <li><Link to="/photo">photo</Link></li>
                            <li><Link to="/video">video</Link></li>
                        </ul>
                    </li>
                    <li className='nav-item'>
                        <Link to={'/contact'}>Contact</Link>
                    </li>
                </ul>
                <div className='registration-button-navbar'>
                    {/* <Link to={'/sign_in'}>
                        <button>sign_up </button>
                    </Link> */}
                      {user ? (
          <div>
            {user?.role === 'admin' ? (
                <>
                <div style={{ display: 'flex', gap: '16px' }}>
              <div className="registration-button-navbar">
                <Link to="/ajouteformation">
                  <button>Dashboard</button>
                </Link>
                </div>
                <div className="registration-button-navbar">
                <Link >
              <button onClick={logoutUser}>Déconnecter</button>
              </Link>
              </div>
              </div>
              </>
            ) : (
                <>
                 <div style={{ display: 'flex', gap: '16px' }}>
                              <div className="registration-button-navbar">
                <Link to="#">
                  <button>{user.name}</button>
                </Link>
                </div>
                <div className="registration-button-navbar">
                <Link>
              <button onClick={logoutUser}>Déconnecter</button>
              </Link>
              </div>
              </div>
</>


            )}

          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '16px' }}>
            <div className="registration-button-navbar">
              <Link to="/sign_in">
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
                </div>
            </nav>
        </div>

      <div className='sidebar'>
        <Sidebar/>
      </div>
    </>
    );
}

export default SecondNavbar