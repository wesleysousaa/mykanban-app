const URL = 'http://localhost:5000/login'

export const login = async (data) => {

    const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}