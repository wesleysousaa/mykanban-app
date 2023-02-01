// Services
import { login } from '../services/login'

// Contexts
import { AuthContextValue } from '../contexts/AuthContext'
import { useState } from 'react'

export const useAuth = () => {

    const { token, setToken } = AuthContextValue()
    const [loading, setLoading] = useState(false)

    const logIn = async () => {
        setLoading(true)
        setToken((await login({ login: 'letscode', senha: 'lets@123' })).token)
        setLoading(false)
    }

    return {
        logIn,
        loading,
        token
    }
}