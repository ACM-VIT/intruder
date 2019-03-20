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
        console.log('%cdisconnectng','background: #222; color: #bada55');
        Cookies.set('token', '')
        dispatch({
            type: 'SET_SOCKET',
            payload: null
        })
    })

    socket.on('criticalState', function () {
        console.log('%ccriticalState','background: #222; color: #bada55');
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
        console.log('%cquestion','background: #222; color: #bada55');
        var { img, audio, video, cipher, statement } = data.content
        console.log('question', data)
        dispatch({ type: 'SET_LOCK', payload: false })
        dispatch({ type: 'SET_WAIT', wait: false })
        dispatch({
            type: 'SET_QUESTION',
            payload: {
                qid: data.number,
                ques: statement,
                img, audio, video, cipher
            }
        })
    })

    socket.on('success', function () {
        console.log('%csuccess','background: #222; color: #bada55');
        dispatch({ type: 'SET_QUESTION', payload: {} })
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 10,
            message: null,
            messageFrom: null
        })
    })

    socket.on('successMessage', function (data) {
        console.log('%csuccessMessage','background: #222; color: #bada55');
        dispatch({
            type: 'SEND_MESSAGE',
            message: data.message,
            messageFrom: data.username
        })
    })

    socket.on('fail', function (data) {
        console.log('%cfail','background: #222; color: #bada55');
        dispatch({ type: 'SET_LOCK', payload: false })
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 5,
            message: null,
            messageFrom: null
        })
        cid = setTimeout(() => {
            dispatch({
                type: 'SET_WAIT',
                wait: false
            })
        }, 5000)
        console.log(cid)
    })

    socket.on('pass', function (data) {
        console.log('%cpass','background: #222; color: #bada55');
        dispatch({ type: 'SET_LOCK', payload: true })
        dispatch({ type: 'SET_SUCCESS_STATE', payload: true })
    })

    socket.on('result', function (data) { //done

    })
}
//change event name to sent ques to success