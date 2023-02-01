// Services
import { getCards } from '../services/getCards'
import { updateCard } from '../services/updateCard'
import { deleteCard } from '../services/deleteCard'
import { postCard } from '../services/postCard'

// Contexts
import { AuthContextValue } from '../contexts/AuthContext'
export const useCards = () => {

    const { token } = AuthContextValue()

    const fetch = async () => {
        if (token) {
            return await getCards(token)
        }
    }

    const update = async (card) => {
        if (token) {
            return (await updateCard(card, token)).cards
        }
    }

    const remove = async (card) => {
        if (token) {
            return (await deleteCard(card, token)).cards
        }
    }

    const create = async (card) => {
        return await postCard(card, token)
    }

    return {
        fetch,
        update,
        remove,
        create
    }
}