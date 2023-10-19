import axios from 'axios';

export async function login(credentials) {
    try {
        const response = await axios.post('/login', credentials)
        console.log('login', response.data)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function logout() {
    try {
        const response = await axios.post('/logout')
        console.log('logout', response.data)
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