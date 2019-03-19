import Cookies from 'js-cookie'
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
        dispatch({
            type: 'SET_QUESTION',
            

        })
    })

    socket.on('criticalState', function () {
        console.log('critical state...')
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 15,
            message: 'Someone intruded into your login. Please wait.',
            messageFrom: 'admin'
        })
    })

    socket.on('notInitialized',function(){
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 10,
            notInit:false,
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