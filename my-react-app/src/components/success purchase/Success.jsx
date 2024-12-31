
import { Link } from 'react-router-dom';
import img from '../../../public/images/checked.png';

import './success.css';
const Success = () => {


return (
    <div className='success-content'>
        <div className='content-s-purchase'>
            <div className='purchase-header'>
                <img src={img} alt='success'/>
                <h1>payment</h1>
                <p>paymentP</p>
            </div>
            <div className='bottom-purchase'>
                <Link to={'/'}>
                    <button>retour</button>
                </Link>
            </div>
        </div>
    </div>
)
}

export default Success