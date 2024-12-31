import React from 'react';
import { Link } from 'react-router-dom';
// import img from '../../../public/images/no-data.png';
import './nodata.css';
const NoData = () => {

return (
    <div className='content-no-data'>
        <div className='nodata-con'>
            {/* <img src={img} alt='No-Data'/> */}
            <h3>nodata</h3>
            <Link to={'/'}><button>returndata</button></Link>
        </div>
    </div>
)
}

export default NoData