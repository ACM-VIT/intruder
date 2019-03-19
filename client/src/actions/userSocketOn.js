import Cookies from 'js-cookie'

//success -----
//successMessage
//messageRequired
//question
//criticalState
//pass
//fail
var cid
export default function bindOn(socket, dispatch) {
    console.log('registering sockets event...')
    socket.on('disconnect', () => {
        Cookies.set('token', '')
        dispatch({
            type: 'SET_SOCKET',
            payload: null
        })
    })

    socket.on('criticalState', function () {
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 0,
            notInit: true,
            message: 'It\'s about to start! Please wait for a few moment',
            messageFrom: 'admin'
        })
    })

    socket.on('question', function (data) {
        dispatch({ type: 'SET_LOCK', payload: false })
        console.log('question', data)
        dispatch({
            type: 'SET_QUESTION',
        })
    })

    socket.on('success', function () {
        dispatch({type:'SET_QUESTION',payload:{}})
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 10,
            message: null,
            messageFrom: null
        })
    })

    socket.on('successMessage', function (data) {
        dispatch({
            type: 'SEND_MESSAGE',
            message: data.username,
            messageFrom: data.message
        })
    })

    socket.on('fail', function (data) {
        dispatch({ type: 'SET_LOCK', payload: false })
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 5,
            message: null,
            messageFrom: null
        })
        cid=setTimeout(() => {
            dispatch({
                type: 'SET_WAIT',
                wait: false
            })
        }, 5000)
    })

    socket.on('pass', function (data) {
        dispatch({ type: 'SET_LOCK', payload: true })
        dispatch({ type: 'SET_SUCCESS_STATE', payload: true })
    })





    socket.on('result', function (data) { //done

    })
}
//change event name to sent ques to success