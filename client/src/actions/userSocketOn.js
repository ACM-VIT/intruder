import Cookies from 'js-cookie'

//success -----
//successMessage
//messageRequired
//question
//criticalState
//pass
//fail

export default function bindOn(socket, dispatch) {
    console.log('registering sockets event...')
    socket.on('disconnect', () => {
        Cookies.set('token', '')
        dispatch({
            type: 'SET_SOCKET',
            payload: null
        })
    })

    socket.on('successMessage', function (data) {
        dispatch({
            type: 'SEND_MESSAGE',
            message: data.username,
            messageFrom: data.message
        })
    })

    socket.on('question', function (data) {
        console.log('question',data)
        dispatch({
            type: 'SET_QUESTION',
        })
    })

    socket.on('success', function () {
        console.log('critical state...')
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 10,
            message: 'Someone intruded into your login. Please wait.',
            messageFrom: 'admin'
        })
    })

    socket.on('criticalState',function(){
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 0,
            notInit:true,
            message: 'It\'s about to start! Please wait for a few moment',
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