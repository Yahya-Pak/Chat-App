const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio=new Audio('ting.mp3');


// const append=(message,position)=>{
//     const messageElement=document.createElement('div')
//     messageElement.innerText=message;
//     messageElement.classList.add(message)
//     messageElement.classList.add(position)
// }

const name = prompt("Enter Your name to Join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    appendMessage(`${name} joined the chat`, 'left');
});

socket.on('receive', data => {
    appendMessage(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    appendMessage(`${name} left the chat`, 'left');
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

function appendMessage(message, position) {
    const messageElement = document.createElement('div');
     messageElement.innerText = message;
    messageElement.classList.add('message', position);
    messageContainer.append(messageElement);
    if (position=='left') {
        audio.play();
        
    }
}
