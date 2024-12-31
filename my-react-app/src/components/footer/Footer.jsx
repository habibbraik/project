import { Link } from 'react-router-dom';
import facebook from '../../../public/images/facebook (1).png';
import instagram from '../../../public/images/instagram.png';
import linkedin from '../../../public/images/linkedin (1).png';
import twitter from '../../../public/images/twitter.png';
import './footer.css';
export const Footer = () => {
  return (
    <div className="footer">
        <div className="s-footer section-footer">
            <div className="section-links">
                <div className="footer-links">
                    <h4>institut</h4>
                    <Link to={'/'}>
                        <p>accueil</p>
                    </Link>
                    <Link to={'/presentation'}>
                        <p>Presentation</p>
                    </Link>
                    <Link to={'/formations'}>
                        <p>cours</p>
                    </Link>
                    <Link to={'/photo'}>
                        <p>galerie</p>
                    </Link>
                    <Link to={'/contact'}>
                        <p>contact</p>
                    </Link>
                </div>
                <div className="footer-links">
                    <h4>cours</h4>
                    <Link to={'/cours/élève'}>
                        <p>élève</p>
                    </Link>
                    <Link to={'/cours/étudiant'}>
                        <p>étudiant</p>
                    </Link>
                    <Link to={'/cours/professionnel'}>
                        <p>professionnel</p>
                    </Link>
                    <Link to={'/cours/doctorat'}>
                        <p>doctorat</p>
                    </Link>
                </div>
                <div className="footer-links">
                    <h4>galerie</h4>
                    <Link to={'/photo'}>
                        <p>photo</p>
                    </Link>
                    <Link to={'/video'}>
                        <p>video</p>
                    </Link>
                </div>
                <div className="footer-links">
                    <h4>contact</h4>
                    <p>firstifrest@gmail.com</p>
                    <p>+213 78 23 67 87 9</p>
                </div>
                <div className="footer-links">
                    <h4>Coming soon</h4>
                    <div className="socialmedia">
                        <p><img src={facebook} alt=""/></p>
                        <p><img src={instagram} alt=""/></p>
                        <p><img src={twitter} alt=""/></p>
                        <p><img src={linkedin} alt=""/></p>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className='footer-below'>
                <div className='footer-copyright'>
                    <p>
                        @{new Date().getFullYear()} INCOFORS. All right reserved.
                    </p>
                </div>
                {/* <div className='footer-below-links'>
                    <a href="#"><div><p>Termes & Conditions</p></div></a>
                    <a href="#"><div><p>Privacy</p></div></a>
                    <a href="#"><div><p>Security</p></div></a>
                    <a href="#"><div><p>Cookie Declaration</p></div></a>
                </div> */}
            </div>
        </div>
    </div>
  )
}
export default Footer;