//emitQuestion
//skip

function emitQuestion(socket) {
    return () => {
        socket.emit('emitQuestion', (success) => {
            console.log('Tried to emit Question')
            console.log({ success })
        })
    }
}

function skip(socket) {
    return () => {
        if (window.confirm('sure?')) {
            console.log('skipping')
            socket.emit('skip')
        }
    }
}

export { skip, emitQuestion }