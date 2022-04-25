import React from 'react';
import logo from '../../../images/notFound.jpg'

const NotFound = () => {
    return (
        <div className='w-100'>
            <h1 className='text-center text-danger'>404...! NOT FOUND..!</h1>
            <img style={{ width: "100%" }} src={logo} alt="" />
        </div>
    );
};

export default NotFound;