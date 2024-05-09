import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import styles from './page.module.css'
import { LuLogIn } from "react-icons/lu"
import Loading from '../loading/page'
import { useMessage } from "../../contexts/useMessage"
import { TextField, Button } from "@mui/material"
import authServices from "../../services/auth"

export default function Auth() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState()
    const [formType, setFormType] = useState('login')
    const { authLoading, login, signup } = authServices()
    const { showMessage } = useMessage()
    
    const handleChangeFormType = (e) => {
        e.preventDefault()

        if(formType === 'login') {
            setFormType('signup')
            setFormData({})
        } else {
            setFormType('login')
            setFormData({})
        }
    }

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        switch (formType) {
            case 'signup':
                if (formData.password !== formData.confirmPassword) {
                    showMessage({text: `Passwords do not match`})
                    return
                }
                signup(formData)
                break

            case 'login':
                login(formData)
                break
        
            default:
                navigate('/auth')
                break
        }
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('auth'))) {
            navigate('/')
        } else {
            navigate('/auth')
        }
    }, [JSON.parse(localStorage.getItem('auth'))])

    if(authLoading) {
        return ( <Loading /> )
    }

    return (
        <div className={styles.pageContainer}>
            { formType === 'signup' ? (
                <>
                    <h1>Signup</h1>
                    <p 
                    className={styles.changeFormTypeBtn} 
                    onClick={handleChangeFormType}
                    >
                        Already have an account?
                    </p>
                    <form onSubmit={handleSubmitForm} className={styles.formContainer}>
                        <TextField
                        onChange={handleFormDataChange}
                        required
                        type="username"
                        label="Username"
                        name='username'
                        size="small"
                        />
                        <TextField
                        onChange={handleFormDataChange}
                        required
                        type="password"
                        label="Password"
                        name='password'
                        size="small"
                        />
                        <TextField
                        onChange={handleFormDataChange}
                        required
                        type="password"
                        label="Confirm password"
                        name='confirmPassword'
                        size="small"
                        />
                        <Button variant="outlined" type='submit'><LuLogIn /> Signup</Button>
                    </form>
                </>
            ) : null } 
            { formType === 'login' ? (
                <>
                    <h1>Login</h1> 
                    <p 
                    className={styles.changeFormTypeBtn} 
                    onClick={handleChangeFormType}
                    >
                        Do you not have an account?
                    </p>
                    <form onSubmit={handleSubmitForm} className={styles.formContainer}>
                        <TextField
                        onChange={handleFormDataChange}
                        required
                        type="username"
                        label="Username"
                        name='username'
                        size="small"
                        />
                        <TextField
                        onChange={handleFormDataChange}
                        required
                        type="password"
                        label="Password"
                        name='password'
                        size="small"
                        />
                        <Button variant="outlined" type='submit'><LuLogIn /> Login</Button>
                    </form>
                </>
            ) : null}  
        </div>
    )
}