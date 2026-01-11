import React, { useState, useContext } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        const userData = { username, password }
        console.log(userData)
        try {
            const response = await axios.post('http://localhost:8000/api/v1/token/', userData)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            console.log("Login successful");
            setIsLoggedIn(true)
            navigate('/dashboard')
        } catch (error) {
            console.log("Invalid credentials")
            setError('Invalid credentials')
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6 bg-light-dark p-5 rounded-2 '>
                        <h3 className='text-light text-center mb-4'>Login to Our Portal</h3>
                        <form onSubmit={handleLogin} >
                            <div className='mb-3'>
                                <input type="text" className='form-control ' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className='mb-3'>
                                <input type="password" className='form-control ' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>

                            {error && <div className='alert alert-danger'>{error}</div>}

                            {loading ? (
                                <button type='submit' className='btn btn-info d-block mx-auto ' disabled > <FontAwesomeIcon icon={faSpinner} spin /> Logging in...</button>
                            ) : (
                                <button type='submit' className='btn btn-info d-block mx-auto mt-3'>Login</button>
                            )}
                        </form>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Login
