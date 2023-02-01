import { createContext, useState } from "react"

export const ChangeContext = createContext()

export const ChangeContextProvider = ({ children }) => {
    const [change, setChange] = useState(false)

    return (
        <ChangeContext.Provider value={{ change, setChange }}>
            {children}
        </ChangeContext.Provider>
    )
}



