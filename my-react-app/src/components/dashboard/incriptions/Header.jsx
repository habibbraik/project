import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
    const location = useLocation();

    return (
        <div className="iscriptions-header">
            <div className='content_iscriptions_header'>
                
            {location.pathname === '/inscription' ?(
                <h1>Gestion des Comptes Utilisateurs</h1>
            ):(
                <h1>Participants aux Cours</h1>
            )}
            <div className="inscription_for_switch">
                {location.pathname === '/inscription' ? (
                    <p>
                        Sur cette page, vous pouvez consulter la liste complète de tous les utilisateurs 
                        qui se sont inscrits sur ce site. Vous trouverez les informations détaillées de chaque utilisateur.
                    </p>
                ):(
                    <p>
                        Vous pouvez consulter les informations des personnes qui se sont inscrites
                        aux cours auparavant et les supprimer si leur période de cours est terminée.
                    </p>
                )}
                {location.pathname === '/inscription' ?(
                    <div className="switch_ins">
                        <Link to="/inscription/all_users">Participants</Link>
                    </div>
                ):(
                    <div className="switch_ins">
                        <Link to="/inscription">Utilisateurs</Link>
                    </div>
                )}
            </div>
            </div>
        <Outlet />
        </div>
    );
};

export default Header;
