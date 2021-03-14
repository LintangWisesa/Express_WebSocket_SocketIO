// socket io in front end

// Make connection
// const socket = io.connect('https://your_host')
const socket = io.connect('localhost:1234')

// Get value from html
let message = document.getElementById('message')
let handle = document.getElementById('handle')
let color = document.getElementById('color')
let send = document.getElementById('send')
let output = document.getElementById('output')
let feedback = document.getElementById('feedback')
let chats = []

// emit button click events
send.addEventListener('click', ()=>{
    let d = new Date();
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        color: color.value,
        time: `${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}`: d.getMinutes()}`
    })
})

// emit keypress input events: "Andi is typing..."
message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value)
})

// listen for events
socket.on('chat', (data)=>{
    let newChat = `
    <div class="container" style="background-color: ${data.color}; bottom: 0px">
        <img src="https://p7.hiclipart.com/preview/340/956/944/computer-icons-user-profile-head-ico-download.jpg" alt="Avatar">
        <b>${data.handle}</b>
        <p>${data.message}</p>
        <span class="time-right">${data.time}</span>
    </div>`
    chats.unshift(newChat)
    output.innerHTML = chats.join(" ")
    // output.innerHTML += `
    // <div class="container" style="background-color: ${data.color}">
    //     <img src="https://p7.hiclipart.com/preview/340/956/944/computer-icons-user-profile-head-ico-download.jpg" alt="Avatar">
    //     <b>${data.handle}</b>
    //     <p>${data.message}</p>
    //     <span class="time-right">${data.time}</span>
    // </div>`
    feedback.innerHTML = ''
})

socket.on('typing', (data)=>{
    feedback.innerHTML = `<h3 style="margin:"10px">${data} is typing...</h3>`
})