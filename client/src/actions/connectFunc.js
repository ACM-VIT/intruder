import io from 'socket.io-client';
import baseURL from '../baseUrl';
import axios from 'axios';
import Cookies from 'js-cookie'
import bindOn from './userSocketOn'
window.io = io

function connectToUserSocket(jwt, dispatch) {
    return new Promise((resolve, reject) => {
        let socket = io(baseURL);
        socket.on('connect', () => {
            bindOn(socket, dispatch)
            window.soc = socket
            console.log('joining...')
            socket.emit('join', jwt, (username) => {
                if (username) {
                    dispatch({
                        type: 'SET_SOCKET',
                        payload: socket
                    })
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        username: 'username'
                    })
                    resolve(socket, username)
                }
                else {
                    reject('invalid login')
                }
            })
        })
    })
}

function connectToAdminSocket(token, dispatch) {
    return new Promise((resolve, reject) => {
        let socket = io(baseURL);
        socket.on('connect', () => {
            bindOn(socket, dispatch)
            window.soc = socket
            console.log('Adminjoining...')
            socket.emit('adminLogin', token, (success) => {
                if (success) {
                    dispatch({
                        type: 'SET_SOCKET',
                        payload: socket
                    })
                    resolve(socket)
                }
                else {
                    reject()
                }
            })
        })
    })
}


function userLogin(jwt) {
    return (dispatch) => {
        dispatch({ type: 'SET_LOCK', payload: true })
        connectToUserSocket(jwt, dispatch).then(() => {
            Cookies.set('userToken', jwt)
            Cookies.set('type', 'user')
            dispatch({ type: 'SET_LOCK', payload: false })
        }).catch(() => {
            dispatch({
                type: 'SET_LOGIN_ERROR',
                payload: true
            })
            dispatch({ type: 'SET_LOCK', payload: false })
        })
    }
}

function userReLogin(dispatch) {
    var token = Cookies.get('userToken')
    if (token) {
        connectToUserSocket(token, dispatch).then(() => {
        }).catch(() => {
            dispatch({
                type: 'LOGOUT_USER',
            })
        })
    }
    else {
        dispatch({
            type: 'LOGOUT_USER',
        })
    }
}

function adminLogin(token) {
    return (dispatch) => {
        dispatch({ type: 'SET_LOCK', payload: true })
        connectToAdminSocket(token, dispatch).then(() => {
            Cookies.set('adminToken', token)
            Cookies.set('type', 'admin')
            dispatch({
                type: 'ADMIN_LOGGED_IN'
            })
            dispatch({ type: 'SET_LOCK', payload: false })
        }).catch(() => {
            dispatch({
                type: 'SET_LOGIN_ERROR',
                payload: true
            })
            dispatch({ type: 'SET_LOCK', payload: false })
        })
    }
}

function adminReLogin(dispatch) {
    var token = Cookies.get('adminToken')
    if (token) {
        connectToAdminSocket(token, dispatch).then(() => {
            dispatch({
                type: 'ADMIN_LOGGED_IN',
            })
        }).catch((e) => {
            console.log(e)
            dispatch({
                type: 'LOGOUT_USER',
            })
        })
    }
    else {
        dispatch({
            type: 'LOGOUT_USER',
        })
    }
}

function reLogin() {
    return (dispatch) => {
        if (Cookies.get('type') == 'user') {
            console.log('user relogin...')
            userReLogin(dispatch);
        }
        else if (Cookies.get('type') == 'admin')
            adminReLogin(dispatch);
        else {
            console.log('loggg')
            dispatch({ type: 'LOGOUT_USER' })
        }
    }
}

function register(username, name) {
    return async (dispatch) => {
        try {
            console.log(baseURL + '/enter')
            var res = await axios.post(baseURL + '/enter', { username, name })
            Cookies.set('userToken', res.data.data.token)
            Cookies.set('type', 'user')
            userReLogin(dispatch)
        }
        catch (e) {
            try {
                dispatch({
                    type: 'SET_LOGIN_ERROR',
                    payload: e.response.data.data.message
                })
            } catch (e) {
                alert()
                console.error(e)
            }
        }
    }
}

export {
    register, userLogin, adminLogin, reLogin
}