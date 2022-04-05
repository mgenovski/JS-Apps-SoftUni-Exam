import { get, post } from "../helpers/jsonRequest.js";

let baseUrl = 'http://localhost:3030/users';

function getAuthToken() {
    return sessionStorage.getItem('token');
}

function getUsername() {
    return sessionStorage.getItem('username');
}

function getUserId() {
    return sessionStorage.getItem('userId');
}

function isLoggedIn() {
    return sessionStorage.getItem('token') !== null;
}
 
async function login(user) {
    let result = await post(`${baseUrl}/login`, user);
    sessionStorage.setItem('token', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('username', result.email);
}

async function register(user) {
    let result = await post(`${baseUrl}/register`, user);
    sessionStorage.setItem('token', result.accessToken);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('username', result.email);
}

async function logout() {
    await get(`${baseUrl}/logout`);
    sessionStorage.clear();
}

export default {
    getAuthToken,
    getUsername,
    getUserId,
    isLoggedIn,
    login,
    logout,
    register
}