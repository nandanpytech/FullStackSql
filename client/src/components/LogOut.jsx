import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function LogOut() {
    const navigate=useNavigate()
    const  handle=()=>{
        localStorage.removeItem('Token')
        localStorage.removeItem('Email')

        navigate("/")
    }
  return (
    <div style={{display:'flex',justifyContent:"flex-end"}}>

    <Button onClick={handle} variant="contained">
        LogOut
    </Button>
    </div>
  )
}

export default LogOut