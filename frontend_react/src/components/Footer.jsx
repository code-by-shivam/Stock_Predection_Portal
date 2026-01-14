import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className='footer py-1 my-1'>
                <hr className='border-bottom' />
                <p className='text-light text-center'> &copy; 2026 - Built with ❤️ by Shivam Chaurasiya</p>
                <p className='text-light text-center'>Data Reference: <a href="https://finance.yahoo.com/" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-none">Yahoo Finance</a></p>
            </footer>
        </>
    )
}

export default Footer