import React from 'react'
import Button from './Button'
const Header = () => {
    return (
        <nav className='navbar container pt-3 pb-3 align-items-start'>
            <a href="" className='navbar-brand text-light'>Stock Predection Portal</a>
            <div>
                <Button text={"Login"} className='btn-outline-info' />
                &nbsp;
                <Button text={"Register"} className='btn-outline-info' />
            </div>

        </nav>
    )
}

export default Header