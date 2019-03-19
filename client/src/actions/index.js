
import io from 'socket.io-client';
import baseURL from '../baseUrl';
import axios from 'axios';
import Cookies from 'js-cookie'
import bindOn from './userSocketOn'
window.io = io

function connectToSocket(jwt,dispatch){
    return new Promise((resolve,reject)=>{
        let socket = io(baseURL);
        bindOn(socket, dispatch)
        socket.on('connect', () => {
            window.soc=socket
            console.log('joining...')
            socket.emit('join', jwt, (username) => {
                if (username) {
                    resolve(username,socket)
                }
                else {
                    reject()
                }
            })
        })
    })
}


function login(jwt) {
    return (dispatch) => {
        dispatch({type:'SET_LOCK',payload:true})
        connectToSocket(jwt,dispatch).then((res)=>{
            dispatch({
                type:'LOGIN_SUCCESS',
                username:res.username
            })
            dispatch({type:'SET_LOCK',payload:false})
            dispatch({
                type: 'SET_SOCKET',
                payload: res.socket
            })
        }).catch(()=>{
            dispatch({
                type:'SET_LOGIN_ERROR',
                payload:true
            })
            dispatch({type:'SET_LOCK',payload:false})
        })
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
        
        // try {
        console.log(baseURL + '/enter')
        var res = await axios.post(baseURL + '/enter', { username, name })
        console.log(res)
        dispatch({ type: 'LOGIN_SUCCESS', payload: true })
        dispatch({ type: 'SET_JWT', payload: res.data.data.token })
        // }
        // catch (e) {
        //     console.log(e.response)
        //     dispatch({ type: 'LOGIN_FAIL' })
        //     dispatch({ type: 'SET_ERR_MSG', payload: e.response.data.data.message })
        // }
        // dispatch({ type: 'LOGIN_SUCCESS', jwt: 'asd' })
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
        setTimeout(() => {
            console.log('setSucces')
            dispatch({
                type: 'SET_SUCCESS_STATE',
                payload: true
            })
        }, 3000)

        setTimeout(() => {
            console.log('sending message')
            dispatch({
                type: 'SEND_MESSAGE',
                message: 'hello hello',
                messageFrom: 'shubham'
            })
        }, 1000)
    }
}

function adminLogin(token) {
    return (dispatch) => {
        console.log('Loggin in admin')
        dispatch({
            type: 'ADMIN_LOGGED_IN'
        })
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
    register, login, submitResponse, sendMsg, adminLogin, setJwt
}