import { useContext } from "react"

// Context
import { ChangeContext } from "../contexts/ChangeContext"

export const useChange = () => {
    const changeContext = useContext(ChangeContext)
    return changeContext
}