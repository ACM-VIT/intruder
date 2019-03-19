
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



function submitResponse(socket,res) {
    return (dispatch) => {
        dispatch({ type: 'SET_LOCK', payload: true })
        socket.emit('submit',res)
    }
}



function sendMsg(socket,res) {
    return (dispatch) => {
        dispatch({ type: 'SET_LOCK', payload: true })
        socket.emit('successMessage',res)
        dispatch({
            type:'SET_SUCCESS_STATE',
            payload:false
        })
    }
}

export {submitResponse, sendMsg, setJwt}