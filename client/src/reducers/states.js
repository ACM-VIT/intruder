var initUserStatus = {
    connected: null,
    name: '',
    id: ''
}

var initQuesStatus = {
    qid: null,
    ques: '',
    img: '',
    audio: '',
    video: '',
    // txt: 'kmkmk',
    cipher: true,
}

var initAppStatus = {
    loggedIn: null,
    username: '',
    socket: null,
    lock: false,
    success: false,
    admin: false,
    loginErr: false,
    username:''
}

var initWaitStatus = {
    wait: false,
    waitTime: 10,
    message: '',//''hello hello',
    messageFrom: '',//'shubham',
    notInit: false
}

function userState(state = initUserStatus, action) {
    switch (action.type) {
        case 'USER_STATUS':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

function quesState(state = initQuesStatus, action) {
    switch (action.type) {
        case 'SET_QUESTION':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

function appState(state = initAppStatus, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, loggedIn: true, username: action.username }
        case 'SET_SUCCESS_STATE':
            return { ...state, success: action.payload }
        case 'LOGOUT_USER':
            return initAppStatus
        case 'ADMIN_LOGGED_IN':
            return { ...state, admin: true, loggedIn: true }
        case 'SET_LOGIN_ERROR':
            return { ...state, loginErr: action.payload }
        case 'SET_LOCK':
            return { ...state, lock: action.payload }
        case 'SET_SOCKET':
            return { ...state, socket: action.payload }
        default:
            return state
    }
}

function waitState(state = initWaitStatus, action) {
    var { wait, waitTime, message, messageFrom, notInit } = action
    switch (action.type) {
        case 'WAIT_STATUS':
            return { ...state, wait: action.payload, waitTime: 15 }
        case 'SUCCESS_WAIT':
            return { ...state, wait: true, waitTime: 0, message: '' }
        case 'SEND_MESSAGE':
            return { ...state, message: action.message, messageFrom: action.messageFrom }
        case 'SET_WAIT':
            return { ...state, message, messageFrom, wait, waitTime, notInit }
        default:
            return state
    }
}
export default {
    userState, quesState, appState, waitState
}