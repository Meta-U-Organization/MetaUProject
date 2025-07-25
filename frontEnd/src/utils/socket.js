import { io } from 'socket.io-client'

const URL = "http://localhost:3000/"
export const socket = io(URL);

socket.on("getNotification", (data) => {
    const newNotif = document.createElement('div')
    newNotif.style.border = "2px solid white"
    newNotif.style.borderRadius = "15px";
    newNotif.style.marginTop = "20px";
    const type = document.createElement('h2');
    type.innerHTML = data.type;
    const description = document.createElement('h3');
    description.innerHTML = data.description;
    newNotif.appendChild(type);
    newNotif.appendChild(description);
    document.getElementById("main").prepend(newNotif);
})
