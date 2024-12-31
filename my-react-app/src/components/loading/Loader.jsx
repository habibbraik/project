import React from 'react';
import './loader.css';
const Loader = () => {
return (
    <div className='loading-load-load'>
        <div className='container-loading'>
            <div className='ring'></div>
            <div className='ring'></div>
            <div className='ring'></div>
        </div>
        <span className='loading-loader'>loading...</span>
    </div>
)
}

export default Loader