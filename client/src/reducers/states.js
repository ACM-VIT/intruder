var initUserStatus = {
    connected: null,
    name: '',
    id: ''
}

var initQuesStatus = {
    qid: null,
    ques: 'Cupidatat ad velit pariatur consectetur deserunt ut cupidatat laborum commodo velit commodo deserunt id. Irure labore labore eiusmod ipsum ad reprehenderit. Officia ex exercitation anim est sint. Deserunt reprehenderit et dolor non veniam in incididunt in. Cupidatat aute mollit Lorem ex aute elit consequat mollit ipsum officia. Ea deserunt amet ullamco voluptate amet in amet ut non labore sint ullamco. Culpa do quis duis ex pariatur exercitation sint consequat ea magna velit consectetur ut velit.',
    img: 'https://www.faitron.com/wp-content/uploads/2018/08/dummy.jpg',
    audio: 'https://9.cdn.music-cdn.com/audio/eyJpdiI6Im1adUhpbUVnRjhiekdoMElwbHFwMkE9PSIsInZhbHVlIjoiVEY3SnJPb2Rnc1N2Yk1aRXJoMnJiRWhuTkFDM2dlQndBMyt4cERqK2JpZDRYcWpLamIzNHdqYnpOWEl3RDdHY29ZS3Z2OUN0RmNjWlwvVVZ4ZlBHOGNlU2dLRkxjQ2FJeFFLYVRNTXhzSUJhajZwVmFQN0FFZG9mWTdjVEhFOUdHSUJtTDB2MEIrY093T2I2eWJXdHhRSnNDUkJuaTI2eFVBM1NFRzVZalRBdDhSMWRxdEFJQ2hyakEzc3kzUkJ6VzFJZmJiVSt6VFJPV1VkeVpVWXJBNUl3Sk5qV1NxazBwMDdRRWNlQlwvRjJKYWJjRVJjVXc4cUljMkZBUU8rbG5FIiwibWFjIjoiNzE5ZTU4YzZiOTJkZjA0N2YwNjg0N2VhYmI0OTAzODk0NjllNjk2NWYxMDU4MzI1YzJlZTk3OWFhNmRiZjUyNiJ9',
    video: 'http://techslides.com/demos/sample-videos/small.mp4',
    txt: 'kmkmk',
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
        case 'QUES_STATUS':
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
            return { ...state, message: 'action.message', messageFrom: 'action.messageFrom' }
        case 'SET_WAIT':
            return { ...state, message, messageFrom, wait, waitTime, notInit }
        default:
            return state
    }
}
export default {
    userState, quesState, appState, waitState
}