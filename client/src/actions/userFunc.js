
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

// socket.emit('adminLogin') //admin
// socket.emit('emitQuestion') // admin
// socket.emit('submit')
// socket.emit('successMessage')
// socket.emit('join')



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

export {submitResponse, sendMsg, setJwt}