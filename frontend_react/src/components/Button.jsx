import React from 'react'

const Button = ({ text, className }) => {
    return (
        <>
            <a className={`btn ${className}`} href="">{text}</a>
        </>
    )
}

export default Button