
import Cookies from 'js-cookie'

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

// socket.emit('submit')
// socket.emit('successMessage')
// socket.emit('join')



function submitResponse(socket, res) {
    return (dispatch) => {
        dispatch({ type: 'SET_LOCK', payload: true })
        if (res)
            socket.emit('submit', res)
        else {
            dispatch({ type: 'SET_LOCK', payload: false })
            dispatch({ type: 'HIDE_MESSAGE' })
            dispatch({
                type: 'SET_WAIT',
                wait: true,
                waitTime: 3,
                waitType: 'fail'
            })
            setTimeout(() => {
                dispatch({
                    type: 'SET_WAIT',
                    wait: false
                })
            }, 3000)
        }
    }
}



function sendMsg(socket, res) {
    return (dispatch) => {
        dispatch({ type: 'SET_LOCK', payload: true })
        socket.emit('successMessage', res)
        dispatch({
            type: 'SET_SUCCESS_STATE',
            payload: false
        })
        Cookies.set('message', res)
        Cookies.set('messageFrom', 'You')
        dispatch({
            type: 'SEND_MESSAGE',
            message: res,
            messageFrom: 'You'
        })
    }
}

function logout() {
    Cookies.set('type', '')
    Cookies.set('adminToken', '')
    Cookies.set('userToken', '')
    Cookies.set('message', '')
    Cookies.set('messageFrom', '')
    return ({
        type: 'LOGOUT_USER',
    })
}

function updateCode(code) {
    return ({
        type: 'UPDATE_CODE',
        payload: code
    })
}

export { submitResponse, sendMsg, setJwt, logout, updateCode }