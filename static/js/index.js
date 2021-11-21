//set connection
const socket = io.connect('http://localhost:8080');

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const sendBtn = document.getElementById('sendBtn');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

//emit events
sendBtn.addEventListener('click', ()=>{
    socket.emit('chat', {
        message:message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress',()=>{
    socket.emit('typing', handle.value);
});

//listen for events
socket.on('display', (data)=>{
    feedback.innerHTML = ``;
    output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});

socket.on('typingView', (data)=>{
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
