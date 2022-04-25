import React from 'react';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear()
    return (
        <>
            <p className='text-center'> <small> &copy; copyright {year}</small></p>
        </>
    );
};

export default Footer;