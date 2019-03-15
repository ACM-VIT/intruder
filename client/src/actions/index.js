
import io from 'socket.io-client';
import baseURL from '../baseUrl';

var socket;

function connectToSocket (jwt){
    return (dispatch)=>{
        socket = io.connect(baseURL,{ jwt });

        socket.on('loginSuccess',function(data){
            dispatch({
                type:'CHANGE_SCREEN', payload:null
            })
        })
    }
}

function login(name,passwd){
    return (dispatch)=>{
        console.log('logging in')
        dispatch({
            type:'LOGIN_SUCCESS', payload:true
        })
    }
}

function submitResponse(res){
    return (dispatch)=>{
        console.log('submitting...',res)
        dispatch({
            type:'WAIT_STATUS',
            payload:true
        })
    }
}

function sendMsg(res){
    return (dispatch)=>{
        console.log('submitting...',res)
        dispatch({
            type:'SUCCESS_WAIT',
        })
    }
}

export {
    connectToSocket, login, submitResponse,sendMsg
}