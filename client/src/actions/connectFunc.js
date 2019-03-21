import io from 'socket.io-client';
import baseURL from '../baseUrl';
import axios from 'axios';
import Cookies from 'js-cookie'
import bindOn from './userSocketOn'
import StatsBindOn from './adminSocketOn'
window.io = io

function connectToUserSocket(jwt, dispatch) {
    return new Promise((resolve, reject) => {
        let socket = io(baseURL);
        socket.on('connect', () => {
            bindOn(socket, dispatch)
            window.soc = socket
            console.log('joining...')
            socket.emit('join', jwt, (payload) => {
                if (payload) {
                    dispatch({
                        type: 'SEND_MESSAGE',
                        message: Cookies.get('message'),
                        messageFrom: Cookies.get('messageFrom')
                    })
                    dispatch({
                        type: 'SET_SOCKET',
                        payload: socket
                    })
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        user: {
                            username: payload.username,
                            name: payload.name
                        }
                    })
                    resolve()
                }
                else {
                    reject('invalid login')
                }
            })
        })
    })
}

function connectToAdminSocket(token, dispatch, isStats) {
    return new Promise((resolve, reject) => {
        let socket = io(baseURL);
        socket.on('connect', () => {
            if (isStats) StatsBindOn(socket, dispatch);
            window.soc = socket
            console.log('Adminjoining...')
            socket.emit(isStats ? 'statsListenerLogin' : 'adminLogin', token, (success) => {
                console.log(success)
                if (success) {
                    dispatch({
                        type: 'SET_SOCKET',
                        payload: socket
                    })
                    dispatch({
                        type: isStats ? 'STATS_LOGGED_IN' : 'ADMIN_LOGGED_IN',
                        user: {
                            username: isStats ? 'StatsListener' : 'Admin',
                            name: isStats ? 'Stats Listener' : 'Admin'
                        }
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


function userLogin(username, passcode) {
    return async (dispatch) => {
        dispatch({ type: 'SET_LOCK', payload: true })
        try {
            var res = await axios.post(baseURL + '/login', { username, passcode })
            connectToUserSocket(res.data.data.token, dispatch).then(() => {
                Cookies.set('userToken', res.data.data.token)
                Cookies.set('type', 'user')
                dispatch({ type: 'SET_LOCK', payload: false })
            })
        }
        catch (e) {
            dispatch({ type: 'SET_LOCK', payload: false })
            try {
                dispatch({
                    type: 'SET_LOGIN_ERROR',
                    payload: e.response.data.data.message
                })
            } catch (e) {
                dispatch({
                    type: 'SET_LOGIN_ERROR',
                    payload: true
                })
            }
        }
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

function adminLogin(token, isStats) {
    return (dispatch) => {
        dispatch({ type: 'SET_LOCK', payload: true })
        connectToAdminSocket(token, dispatch, isStats).then(() => {
            Cookies.set('adminToken', token)
            Cookies.set('type', isStats ? 'stats' : 'admin')
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

function adminReLogin(dispatch, isStats) {
    var token = Cookies.get('adminToken')
    if (token) {
        connectToAdminSocket(token, dispatch, isStats).then(() => {
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
        if (Cookies.get('type') === 'user') {
            console.log('user relogin...')
            userReLogin(dispatch);
        }
        else if (Cookies.get('type') === 'admin')
            adminReLogin(dispatch);
        else if (Cookies.get('type') === 'stats')
            adminReLogin(dispatch, true);
        else {
            console.log('loggg')
            dispatch({ type: 'LOGOUT_USER' })
        }
    }
}

function register(username, name, passcode) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_LOCK', payload: true })
            console.log(baseURL + '/enter')
            console.log({ username, name, passcode })
            var res = await axios.post(baseURL + '/enter', { username, name, passcode })
            Cookies.set('userToken', res.data.data.token)
            Cookies.set('type', 'user')
            userReLogin(dispatch)
            dispatch({ type: 'SET_LOCK', payload: false })
        }
        catch (e) {
            dispatch({ type: 'SET_LOCK', payload: false })
            try {
                dispatch({
                    type: 'SET_LOGIN_ERROR',
                    payload: e.response.data.data.message
                })
            } catch (e) {
                dispatch({
                    type: 'SET_LOGIN_ERROR',
                    payload: true
                })
            }
        }
    }
}

export {
    register, userLogin, adminLogin, reLogin
}