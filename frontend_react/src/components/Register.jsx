import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleRegistration = async (e) => {
        e.preventDefault();
        setLoading(true)

        const userData = {
            username,
            email,
            password
        }

        try {
            const response = await axios.post('http://localhost:8000/api/v1/register/', userData)
            console.log(response.data)
            console.log('Registration successful')
            setError({})
            setSuccess(true)
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
                console.log('Registration error', error.response.data)
            } else {
                console.log('Registration error', error.message)
            }

        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6 bg-light-dark p-5 rounded-2 '>
                        <h3 className='text-light text-center mb-4'>Create an Account</h3>
                        <form onSubmit={handleRegistration}>
                            <div className='mb-3'>
                                <input type="text" className='form-control ' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                                <small>{error.username && <span className='text-danger'>{error.username}</span>}</small>
                            </div>
                            <div className='mb-3'>
                                <input type="email" className='form-control ' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <small>{error.email && <span className='text-danger'>{error.email}</span>}</small>
                            </div>
                            <div className='mb-3'>
                                <input type="password" className='form-control ' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <small>{error.password && <span className='text-danger'>{error.password}</span>}</small>
                            </div>
                            {success && <div className='alert alert-success'>Registration successful</div>}
                            {loading ? (
                                <button type='submit' className='btn btn-info d-block mx-auto ' disabled > <FontAwesomeIcon icon={faSpinner} spin /> Please wait...</button>
                            ) : (
                                <button type='submit' className='btn btn-info d-block mx-auto mt-3'>Register</button>
                            )}
                        </form>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Register