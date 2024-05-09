import { useState } from "react"
import { useMessage } from "../contexts/useMessage"
import { useNavigate } from 'react-router-dom'

export default function authServices () {
    const [authLoading, setAuthLoading] = useState(false)
    const { showMessage } = useMessage()
    const navigate = useNavigate()

    const url = `http://localhost:3000/auth`
  
    const login = (formData) => {
        setAuthLoading(true)
        
        fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(formData)
        })
        .then((resp) => resp.json())
        .then((result) => {
            if(result.body) {
                if (result.success && result.body.user) {
                    localStorage.setItem(
                        'auth', 
                        JSON.stringify({
                            token: result.body.token, 
                            user: result.body.user
                        })
                    )
                }
                showMessage({ text: result.body.message, success: result.success })
            } else {
                throw new Error
            }
        })
        .catch((error) => {
            console.log(error)
            showMessage({ text: 'Error during login' })
        })
        .finally(() => {
            setAuthLoading(false)
        })
    }

    const signup = (formData) => {
        setAuthLoading(true)
        
        fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(formData)
        })
        .then((resp) => resp.json())
        .then((result) => {
            if(result.body) {
                if (result.success && result.body.user) {
                    localStorage.setItem(
                        'auth', 
                        JSON.stringify({
                            token: result.body.token, 
                            user: result.body.user
                        })
                    )
                }
                showMessage({ text: result.body.message, success: result.success })
            } else {
                throw new Error
            }
        })
        .catch((error) => {
            console.log(error)
            showMessage({text: `Error during signup`})
        })
        .finally(() => {
            setAuthLoading(false)
        })
    }

    const logout = () => {
        localStorage.removeItem('auth')
        showMessage({text: `See you later`, success: true})
        navigate('/auth')
    }

    return { authLoading, login, logout, signup }
}