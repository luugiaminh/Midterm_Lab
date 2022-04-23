import axios from 'axios'

const API_URL = '/api/users/'

//Register
const register = async (userData) => {
    const reponse = await axios.post(API_URL, userData)

    if (reponse.data){
        localStorage.setItem('user', JSON.stringify(reponse.data))
    }

    return reponse.data
}

//Login
const login = async (userData) => {
    const reponse = await axios.post(API_URL+'login', userData)

    if (reponse.data){
        localStorage.setItem('user', JSON.stringify(reponse.data))
    }

    return reponse.data
}

//Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
}

export default authService
