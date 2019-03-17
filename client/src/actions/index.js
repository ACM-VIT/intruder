
import io from 'socket.io-client';
import baseURL from '../baseUrl';
import axios from 'axios';
var socket;

function connectToSocket(jwt) {
    return (dispatch) => {
        socket = io.connect(baseURL, { jwt });

        socket.on('successMessage', function (data) {
            dispatch({
                type: 'SEND_MESSAGE',
                message:data.username,
                messageFrom:data.message
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
                wait:true,
                waitTime:15,
                message:'Someone intruded into your login. Please wait.',
                messageFrom:'admin'
            })
        })

        socket.on('messageRequired', function (data) {
            dispatch({type:'SET_SUCCESS_STATE'})
        })

        socket.on('success', function (data) {
            dispatch({type:'SET_SUCCESS_STATE'})
        })

        socket.on('ready', function (data) {

        })

        socket.on('intruderMessage', function (data) { //afterLogin intrude

        })

        socket.on('result', function (data) { //done

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
        dispatch({type: 'LOGIN_SUCCESS', jwt: 'asd'})
    }
}

function submitResponse(res) {
    return (dispatch) => {
        console.log('submitting...', res)
        dispatch({
            type: 'WAIT_STATUS',
            payload: true
        })
    }
}

function sendMsg(res) {
    return (dispatch) => {
        console.log('submitting...', res)
        dispatch({
            type: 'SUCCESS_WAIT',
        })
    }
}

export {
    connectToSocket, login, submitResponse, sendMsg
}