import React from 'react'


const Footer = () => {
    return (
        <div className='footer'>
            <h4 className='text-center'> All rights reserved &copy; SuccessDay</h4>
            <p className='text-center'>
                <a href='/about' className='link'>About</a>|
                <a href='/contact' className='link'>Contact</a>|
                <a href='/policy' className='link'>Privacy Policy</a>
            </p>
        </div>
    )
}

export default Footer