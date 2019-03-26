// socket io in front end

// Make connection
var socket = io.connect('http://localhost:1234')

// Get value from html
var message = document.getElementById('message')
var handle = document.getElementById('handle')
var send = document.getElementById('send')
var output = document.getElementById('output')

// emit events
send.addEventListener('click', ()=>{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

// listen for events
socket.on('chat', (data)=>{
    output.innerHTML += `<p><strong>${data.handle}:</strong>&nbsp;&nbsp;${data.message}</p>`
})