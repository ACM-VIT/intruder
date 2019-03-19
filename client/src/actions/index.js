
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
                    resolve(username, socket)
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
        connectToUserSocket(jwt, dispatch).then((res) => {
            Cookies.set('userToken', jwt)
            Cookies.set('type', 'user')
            dispatch({
                type: 'LOGIN_SUCCESS',
                username: res.username
            })
            dispatch({ type: 'SET_LOCK', payload: false })
            dispatch({
                type: 'SET_SOCKET',
                payload: res.socket
            })
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
        connectToUserSocket(token, dispatch).then((res) => {
            dispatch({
                type: 'LOGIN_SUCCESS',
                username: res.username
            })
            dispatch({
                type: 'SET_SOCKET',
                payload: res.socket
            })
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
        connectToAdminSocket(token, dispatch).then((res) => {
            Cookies.set('adminToken', token)
            Cookies.set('type', 'admin')
            dispatch({
                type: 'ADMIN_LOGGED_IN'
            })
            dispatch({ type: 'SET_LOCK', payload: false })
            dispatch({
                type: 'SET_SOCKET',
                payload: res.socket
            })
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
        connectToAdminSocket(token, dispatch).then((res) => {
            dispatch({
                type: 'ADMIN_LOGGED_IN',
            })
            dispatch({
                type: 'SET_SOCKET',
                payload: res.socket
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


function setJwt() {
    if (Cookies.get('token')) {
        return ({
            type: 'SET_JWT',
            payload: Cookies.get('token')
        })
    }
    else {
        return ({
            type: 'LOGOUT_USER',
        })
    }
}

// socket.emit('adminLogin') //admin
// socket.emit('emitQuestion') // admin
// socket.emit('submit')
// socket.emit('successMessage')
// socket.emit('join')

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
            }catch(e){
                alert()
                console.error(e)
            }
        }
    }
}

function submitResponse(res) {
    return (dispatch) => {
        console.log('submitting...', res)
        dispatch({
            type: 'WAIT_STATUS',
            payload: true
        })
        // dispatch({
        //     type: 'SEND_MESSAGE',
        //     message: 'hello hello',
        //     messageFrom: 'shubham'
        // })
        // setTimeout(() => {
        //     console.log('setSucces')
        //     dispatch({
        //         type: 'SET_SUCCESS_STATE',
        //         payload: true
        //     })
        // }, 3000)

        // setTimeout(() => {
        //     console.log('sending message')
        //     dispatch({
        //         type: 'SEND_MESSAGE',
        //         message: 'hello hello',
        //         messageFrom: 'shubham'
        //     })
        // }, 1000)
    }
}



function sendMsg(res) {
    return (dispatch) => {
        console.log('submitting...', res)
        dispatch({
            type: 'SET_SUCCESS_STATE',
            payload: false
        })
        dispatch({
            type: 'SUCCESS_WAIT',
        })
    }
}

export {
    register, userLogin, submitResponse, sendMsg, adminLogin, setJwt, reLogin
}