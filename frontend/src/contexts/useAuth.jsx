import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const { pathname } = useLocation()

    const authData = JSON.parse(localStorage.getItem('auth'))

	useEffect(() => {
        if(authData?.user) {
            setUser(authData.user)
        } else {
            setUser(null)   
        }
	}, [pathname])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}