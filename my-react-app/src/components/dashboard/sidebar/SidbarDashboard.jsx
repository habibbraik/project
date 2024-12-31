import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import add from '../../../../public/images/add.png';
import addB from '../../../../public/images/addB.png';
import admin from '../../../../public/images/personnaliser.png';
import pr from '../../../../public/images/pr.png';
import prB from '../../../../public/images/prB.png';
import pv from '../../../../public/images/pv.png';
import pvB from '../../../../public/images/pvB.png';
import saveB from '../../../../public/images/saveB.png';
import saveW from '../../../../public/images/saveW.png';
import st from '../../../../public/images/st.png';
import stB from '../../../../public/images/stB.png';
import customFetch from '../../../utils/customFetch';
import './sideBar.css';
import SideSmall from './SideSmall';


const SidbarDashboard = ({isModalOpen}) => {
    const navigate = useNavigate();
    const [isOpenSidebarAdmin , setIsOpenSidebarAdmin] = useState(false);

    const openSidebarAdminfn = () => {
        setIsOpenSidebarAdmin(!isOpenSidebarAdmin);
    }
    console.log(isOpenSidebarAdmin)
    const closeSidebarAdminfn = () => {
        setIsOpenSidebarAdmin(false);
    }


    const logoutUser = async () => {
        try {
          await customFetch.get('/auth/logout')
        //   clearUser()
          toast.success('logout successfully');
          return navigate('/login')
        } catch (error) {
          toast.error(error?.response?.data?.msg)
          return error
        }
      }
    const location = useLocation();

    return (
        <>
        <div className='mainSidebarContainer'>
            <div className='content-sidebare'>
                <div className='AdminTitle'>
                    <img src={admin} alt="" className='sidebarIconsAdmin' />
                </div>
                <ul className='ulContainer'>
                    <li className={location.pathname === '/ajouteformation' ? 'clickedli' : 'liContainer'}>
                        {location.pathname === '/ajouteformation' ?(
                            <img src={add} alt='' className='sidebarIconsDas' />
                        ):(
                            <img src={addB} alt='' className='sidebarIconsDas' />
                        )}
                        <NavLink to={'/ajouteformation'} className={location.pathname === '/ajouteformation' ? 'clickedLink' : 'ItemsNames'}>Formation</NavLink>
                    </li>
                    <li className={((location.pathname === '/inscription') || (location.pathname === '/inscription/all_users')) ? 'clickedli' : 'liContainer'}>
                        {((location.pathname === '/inscription') || (location.pathname === '/inscription/all_users')) ? (
                            <img src={saveW} alt='' className='sidebarIconsDas' />
                        ):(
                            <img src={saveB} alt='' className='sidebarIconsDas' />
                        )}
                        <NavLink to={'/inscription'} className={((location.pathname === '/inscription') || (location.pathname === '/inscription/all_users')) ? 'clickedLink' : 'ItemsNames'}>Inscriptions</NavLink>
                    </li>
                    <li className={location.pathname === '/photo-video' ? 'clickedli' : 'liContainer'}>
                        {location.pathname === '/photo-video' ?(
                            <img src={pv} alt='' className='sidebarIconsDas' />
                        ):(
                            <img src={pvB} alt='' className='sidebarIconsDas' />
                        )}
                        <NavLink to={'/photo-video'} className={location.pathname === '/photo-video' ? 'clickedLink' : 'ItemsNames'}>Vidéos Photos</NavLink>
                    </li>
                    <li className={location.pathname === ('/parametres' || '/formation/course/:id') ? 'clickedli' : 'liContainer'}>
                        {location.pathname === ('/parametres' || '/formation/course/:id') ? (
                            <img src={pr} alt='' className='sidebarIconsDas'/>
                        ) : (
                            <img src={prB} alt='' className='sidebarIconsDas' />
                        )}
                        <NavLink to={'/parametres'} className={location.pathname === ('/parametres' || '/ajouteformation/course/:id') ? 'clickedLink' : 'ItemsNames'}>Paramètres</NavLink>
                    </li>
                    <li className={location.pathname === '/statistique' ? 'clickedli' : 'liContainer'}>
                        {location.pathname === '/statistique' ? (
                            <img src={st} alt='' className='sidebarIconsDas' />
                        ):(
                            <img src={stB} alt='' className='sidebarIconsDas' />
                        )}
                        <NavLink to={'/statistique'} className={location.pathname === '/statistique' ? 'clickedLink' : 'ItemsNames'}>Statistiques</NavLink>
                    </li>
                </ul>
                <div className='return-admin-link-container'>
                    <Link to={'/'}>
                        <li  className={location.pathname === '/' ? 'clickedli' : 'liContainer'}>
                            <img src={''} alt='' className='sidebarIconsDas' />
                            <NavLink to={'/'}  className='return-from-admin'>Retoure</NavLink>
                        </li>
                    </Link>
                </div>
            </div>
        </div>
        <header className='navbar-admin'>
            <div className='content-navbar-admin'>
                <div className='logo-admin'>
                    <h3>admin</h3>
                </div>
                <div className='fabars-admin'>
                    <button onClick={openSidebarAdminfn}>{!isOpenSidebarAdmin?(
                        <FaBars/>
                    ):(
                        <RxCross2/>
                    )}
                        </button>
                </div>
            </div>
        </header>
        <SideSmall closeSidebarAdminfn={closeSidebarAdminfn} isOpenSidebarAdmin={isOpenSidebarAdmin} />
        </>
    )
}

export default SidbarDashboard;
