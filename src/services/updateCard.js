const URL = 'http://localhost:5000/cards/'

export const updateCard = async (card, token) => {
    const response = await fetch(`${URL}/${card._id}`, {
        method: 'PUT',
        body: JSON.stringify(card),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    return await response.json()
}