import React from 'react'
import { createContext, useState, useContext } from 'react'


const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('accessToken')
    )


    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }
