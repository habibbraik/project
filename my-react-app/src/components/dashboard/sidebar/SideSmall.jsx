import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import add from '../../../../public/images/add.png';
import addB from '../../../../public/images/addB.png';
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
import './sideSmall.css';


const SideSmall = ({closeSidebarAdminfn , isOpenSidebarAdmin}) => {
    const navigate = useNavigate();
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
    <aside className={isOpenSidebarAdmin ? 'sidebar-admin sidebar-admin-opned' : 'sidebar-admin'}>
        <div className='content-sidebar-admin'>
            {/* <div className='header-content-sidebar-admin'>
                <div className='logo-admin-side'>
                    <h3>admin</h3>
                </div>
                <div className='closing-sidebar-admin'>
                    <button onClick={closeSidebarAdminfn}><ImCross/></button>
                </div>
            </div> */}
            <div className='links-sidebar-admin'>
            <ul className='ulContainerSm'>
                    <Link to={'/ajouteformation'}>
                        <li className={location.pathname === '/ajouteformation' ? 'clickedliSm' : 'liContainerSm'}>
                            {location.pathname === '/ajouteformation' ?(
                                <img src={add} alt='' className='sidebarIconsDas' />
                            ):(
                                <img src={addB} alt='' className='sidebarIconsDas' />
                            )}
                            <NavLink to={'/ajouteformation'} className={location.pathname === '/ajouteformation' ? 'clickedLinkSm' : 'ItemsNamesSm'}>Formation</NavLink>
                        </li>
                    </Link>
                    <Link to={'/inscription'}>
                        <li className={((location.pathname === '    /inscription') || (location.pathname === '/inscription/all_users')) ? 'clickedliSm' : 'liContainerSm'}>
                            {((location.pathname === '    /inscription') || (location.pathname === '/inscription/all_users')) ? (
                                <img src={saveW} alt='' className='sidebarIconsDas' />
                            ):(
                                <img src={saveB} alt='' className='sidebarIconsDas' />
                            )}
                            <NavLink to={'/inscription'} className={((location.pathname === '    /inscription') || (location.pathname === '/inscription/all_users')) ? 'clickedLinkSm' : 'ItemsNamesSm'}>Inscriptions</NavLink>
                        </li>
                    </Link>
                    <Link to={'/photo-video'}>
                        <li className={location.pathname === '/photo-video' ? 'clickedliSm' : 'liContainerSm'}>
                            {location.pathname === '/photo-video' ?(
                                <img src={pv} alt='' className='sidebarIconsDas' />
                            ):(
                                <img src={pvB} alt='' className='sidebarIconsDas' />
                            )}
                            <NavLink to={'/photo-video'} className={location.pathname === '/photo-video' ? 'clickedLinkSm' : 'ItemsNamesSm'}>Vidéos Photos</NavLink>
                        </li>
                    </Link>
                    <Link to={'/parametres'}>
                        <li className={location.pathname === ('/parametres' || '/formation/course/:id') ? 'clickedliSm' : 'liContainerSm'}>
                            {location.pathname === ('/parametres' || '/formation/course/:id') ? (
                                <img src={pr} alt='' className='sidebarIconsDas' />
                            ) : (
                                <img src={prB} alt='' className='sidebarIconsDas'/>
                            )}
                            <NavLink to={'/parametres'} className={location.pathname === ('/parametres' || '/formation/course/:id') ? 'clickedLinkSm' : 'ItemsNamesSm'}>Paramètres</NavLink>
                        </li>
                    </Link>
                    <Link to={'/statistique'}>
                        <li className={location.pathname === '/statistique' ? 'clickedliSm' : 'liContainerSm'} id={window.innerWidth>= 877 ? 'appear-se' : 'disappear-se' }>
                            {location.pathname === '/statistique' ? (
                                <img src={st} alt='' className='sidebarIconsDas' />
                            ):(
                                <img src={stB} alt='' className='sidebarIconsDas' />
                            )}
                            <NavLink to={'/statistique'} className={location.pathname === '/statistique' ? 'clickedLinkSm' : 'ItemsNamesSm'}>Statistiques</NavLink>
                        </li>
                    </Link>
                    <Link to={'/'}>
                        <li  className={location.pathname === '/' ? 'clickedliSm' : 'liContainerSm'}>
                            <img src={''} alt='' className='sidebarIconsDas' />
                            <NavLink to={'/'}  className={location.pathname === '/' ? 'clickedLinkSm' : 'ItemsNamesSm'}>Retoure</NavLink>
                        </li>
                    </Link>
                </ul>
            </div>
            <div>

            </div>
        </div>
    </aside>
  )
}

export default SideSmall