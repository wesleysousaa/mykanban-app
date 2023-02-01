const URL = 'http://localhost:5000/cards/'

export const deleteCard = async (card, token) => {
    const response = await fetch(`${URL}/${card._id}`, {
        method: 'DELETE',
        body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    
    return await response.json()
}
