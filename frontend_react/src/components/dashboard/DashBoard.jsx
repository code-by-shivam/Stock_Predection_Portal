import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
const DashBoard = () => {
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get("/protected/")
                console.log("protected data", response.data)
            } catch (error) {
                console.log("error fetching protected data", error)
            }

        }
        fetchProtectedData()

    }, [])

    return (
        <>

        </>
    )
}

export default DashBoard
