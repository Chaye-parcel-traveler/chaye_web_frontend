import axios from 'axios';

export function login(credentials) {
    try {
        const response = axios.post('/login', credentials)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function fetchMembers() {
    try {
        const response = await axios.get('/members')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error)
    }
}