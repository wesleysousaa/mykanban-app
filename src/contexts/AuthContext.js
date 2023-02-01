import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(undefined)

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthContextValue = () => {
    const authContext = useContext(AuthContext)
    return authContext
}

