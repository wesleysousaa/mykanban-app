const URL = 'http://localhost:5000/cards'

export const postCard = async (card, token) => {
    const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(card),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })

    return await response.json()
}
