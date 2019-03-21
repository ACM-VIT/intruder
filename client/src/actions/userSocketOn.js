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
        console.log('%cdisconnectng', 'background: #222; color: #bada55');
        Cookies.set('token', '')
        dispatch({
            type: 'SET_SOCKET',
            payload: null
        })
    })

    socket.on('criticalState', function () {
        console.log('%ccriticalState', 'background: #222; color: #bada55');
        Cookies.set('message', 'It\'s about to start! Please wait for a few moments.')
        Cookies.set('messageFrom', 'admin')
        dispatch({
            type: 'SEND_MESSAGE',
            message: 'It\'s about to start! Please wait for a few moments.',
            messageFrom: 'admin'
        })
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 0,
            message: 'It\'s about to start! Please wait for a few moments.',
            messageFrom: 'admin',
            waitType: null
        })
    })

    socket.on('question', function (data) {
        console.log('%cquestion', 'background: #222; color: #bada55');
        var { img, audio, video, cipher, statement } = data.content
        console.log('question', data)
        dispatch({ type: 'SET_LOCK', payload: false })
        dispatch({ type: 'SET_WAIT', wait: false }) ///
        dispatch({
            type: 'SET_QUESTION',
            payload: {
                qid: data.number,
                ques: statement,
                img, audio, video, cipher
            }
        })
    })

    socket.on('success', function (username, finished) {
        alert(finished)
        console.log('%csuccess', 'background: #222; color: #bada55');
        dispatch({ type: 'SET_QUESTION', payload: {} })
        dispatch({ type: 'HIDE_MESSAGE' })
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 10,
            waitType: 'intrusion'
        })
        if (finished) {
            setTimeout(() => {
                alert()
                dispatch({ type: 'HIDE_MESSAGE' })
                dispatch({
                    type: 'SET_WAIT',
                    wait: true,
                    waitTime: 0,
                    waitType: 'finished'
                })
                dispatch({ type: 'SET_LOCK', payload: false })
            }, 7000)
        }
    })

    socket.on('successMessage', function (data) {
        console.log('%csuccessMessage', 'background: #222; color: #bada55');
        Cookies.set('message', data.message)
        Cookies.set('messageFrom', data.username)
        dispatch({
            type: 'SEND_MESSAGE',
            message: data.message,
            messageFrom: data.username
        })
    })

    socket.on('fail', function (data) {
        console.log('%cfail', 'background: #222; color: #bada55');
        dispatch({ type: 'SET_LOCK', payload: false })
        dispatch({ type: 'HIDE_MESSAGE' })
        dispatch({
            type: 'SET_WAIT',
            wait: true,
            waitTime: 3,
            waitType: 'fail'
        })
        cid = setTimeout(() => {
            dispatch({
                type: 'SET_WAIT',
                wait: false
            })
        }, 3000)
        console.log(cid)
    })

    socket.on('pass', function (data) {
        console.log('%cpass', 'background: #222; color: #bada55');
        dispatch({ type: 'SET_LOCK', payload: true })
        dispatch({ type: 'SET_SUCCESS_STATE', payload: true })
    })
}
//change event name to sent ques to success