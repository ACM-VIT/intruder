
import io from 'socket.io-client';
import baseURL from '../baseUrl';
import axios from 'axios';
import Cookies from 'js-cookie'

function connectToSocket(jwt) {
    return (dispatch) => {
        console.log('Connecting to socket')
        let socket = io.connect('https://attendance-socket.herokuapp.com', { jwt });
        dispatch({
            type: 'SET_SOCKET',
            payload: socket
        })
        socket.on('disconnect', () => {
            Cookies.set('token', '')
            window.location.reload()
        })

        socket.on('successMessage', function (data) {
            dispatch({
                type: 'SEND_MESSAGE',
                message: data.username,
                messageFrom: data.message
            })
        })

        socket.on('question', function (data) {
            dispatch({
                type: 'SET_QUESTION',

            })
        })

        socket.on('criticalState', function () {
            dispatch({
                type: 'SET_WAIT',
                wait: true,
                waitTime: 15,
                message: 'Someone intruded into your login. Please wait.',
                messageFrom: 'admin'
            })
        })

        socket.on('messageRequired', function (data) {
            dispatch({ type: 'SET_SUCCESS_STATE' })
        })

        socket.on('success', function (data) {
            dispatch({ type: 'SET_SUCCESS_STATE' })
        })

        socket.on('ready', function (data) {

        })

        socket.on('intruderMessage', function (data) { //afterLogin intrude

        })

        socket.on('result', function (data) { //done

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

function login(username, name) {
    return async (dispatch) => {
        // try{
        // var res=await axios.post(baseURL+'/enter',{username, name})
        // dispatch({type: 'LOGIN_SUCCESS', payload: true})
        // dispatch({type: 'SET_JWT', payload: res.data.data.token})
        // }
        // catch(e){
        //     dispatch({type: 'LOGIN_FAIL'})
        //     dispatch({type: 'SET_ERR_MSG', payload: e.response.data.data.message})
        // }
        dispatch({ type: 'LOGIN_SUCCESS', jwt: 'asd' })
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
    connectToSocket, login, submitResponse, sendMsg, adminLogin, setJwt
}