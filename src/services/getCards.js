const URL = 'http://localhost:5000/cards'

export const getCards = async (token) => {
    const response = await fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })

    return await response.json()
}
