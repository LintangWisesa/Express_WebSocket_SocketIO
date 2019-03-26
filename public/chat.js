// socket io in front end

// Make connection
var socket = io.connect('http://localhost:1234')

// Get value from html
var message = document.getElementById('message')
var handle = document.getElementById('handle')
var send = document.getElementById('send')
var output = document.getElementById('output')
var feedback = document.getElementById('feedback')

// emit button click events
send.addEventListener('click', ()=>{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

// emit keypress input events: "Andi is typing..."
message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value)
})

// listen for events
socket.on('chat', (data)=>{
    output.innerHTML += `<p><strong>${data.handle}:</strong>&nbsp;&nbsp;${data.message}</p>`
    feedback.innerHTML = ''
})

socket.on('typing', (data)=>{
    feedback.innerHTML = `<i>${data} is typing...</i>`
})