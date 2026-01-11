import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <nav className='navbar container pt-3 pb-3 align-items-start'>
            <Link to="/" className='navbar-brand text-light'>Stock Predection Portal</Link>
            <div>
                <Button text={"Login"} className='btn-outline-info' url="/login" />
                &nbsp;
                <Button text={"Register"} className='btn-outline-info' url="/register" />
            </div>

        </nav>
    )
}

export default Header