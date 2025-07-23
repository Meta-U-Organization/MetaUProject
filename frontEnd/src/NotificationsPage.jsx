import { useEffect } from "react";
import "./App.css";
import Navigation from "./components/nav";
import Notification from "./components/notification";
import useUserNotifications from "./utils/useUserNotifications";
import { useContext } from "react";
import { Context } from "./App";
import { socket } from "./utils/socket";
import React from "react";
//main page layout for the page
function NotificationsPage() {
    const {signedInUser} = useContext(Context);
    const { fetchUserNotifications, notifications, loading} = useUserNotifications(signedInUser.id);
    useEffect(() => {
        fetchUserNotifications();
        
        return  () => {
            socket.off("getNotification")
        }
    }, [])

    useEffect(()=> {
        fetchUserNotifications();
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
        return  () => {
            socket.off("getNotification")
        }
    }, [socket]);
    return (
        <div>
            <header>
                <Navigation />
                <h1>Notifications</h1>
            </header>
            <main id="main">
                {loading ? <h1>Loading...</h1> : notifications?.map((notification) => {
                    return <Notification key={notification.id} title={notification.type} description={notification.description}/>
                })}
            </main>
        </div>
    );
}

export default NotificationsPage;
