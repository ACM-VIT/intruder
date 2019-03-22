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
    cipher: false,
    code: '// Clear this and type your answer here...'
}

var initAppStatus = {
    loggedIn: null,
    user: { name: '', username: '' },
    socket: null,
    lock: false,
    success: false,
    admin: false,
    loginErr: false,
    statsConsoleVal: '',
    statsListen: false
}

var initWaitStatus = {
    wait: false,
    waitTime: 10,
    message: '',//''hello hello',
    messageFrom: '',//'shubham',
    notInit: false,
    waitType: null,
    displayMsg: false
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
        case 'UPDATE_CODE':
            return { ...state, code: action.payload }
        case 'CLEAR_CODE':
            return { ...state, code: '// Clear this and type your answer here...' }
        default:
            return state
    }
}

function appState(state = initAppStatus, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, loggedIn: true, user: action.user }
        case 'SET_SUCCESS_STATE':
            return { ...state, success: action.payload }
        case 'LOGOUT_USER':
            return initAppStatus
        case 'ADMIN_LOGGED_IN':
            return { ...state, admin: true, loggedIn: true, user: action.user }
        case 'SET_LOGIN_ERROR':
            return { ...state, loginErr: action.payload }
        case 'SET_LOCK':
            return { ...state, lock: action.payload }
        case 'SET_SOCKET':
            return { ...state, socket: action.payload }
        case 'SET_STATS_VALUE':
            return { ...state, statsConsoleVal: `${state.statsConsoleVal}\n${action.payload}\n` }
        case 'STATS_LOGGED_IN':
            return { ...state, statsListen: true, loggedIn: true, user: action.user }
        default:
            return state
    }
}

function waitState(state = initWaitStatus, action) {
    var { wait, waitTime, message, messageFrom, waitType } = action
    switch (action.type) {
        case 'WAIT_STATUS':
            return { ...state, wait: action.payload, waitTime: 15 }
        case 'SUCCESS_WAIT':
            return { ...state, wait: true, waitTime: 0, message: '' }
        case 'HIDE_MESSAGE':
            return { ...state, displayMsg: false }
        case 'SEND_MESSAGE':
            return { ...state, message, messageFrom, displayMsg: true }
        case 'SET_WAIT':
            return { ...state, wait, waitTime, waitType }
        default:
            return state
    }
}
export default {
    userState, quesState, appState, waitState
}