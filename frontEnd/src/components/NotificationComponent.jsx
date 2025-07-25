import { useContext, useEffect, useMemo, useState } from "react";
import useUserNotifications from "../utils/useUserNotifications";
import { Context } from "../App";
import Notification from "./notification";
import { socket } from "../utils/socket";

function NotificationComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const {signedInUser} = useContext(Context);
    const [numNewNotifs, setNumNewNotifs] = useState(0);
    const { fetchUserNotifications, notifications, loading} = useUserNotifications(signedInUser?.id);
    const [socketNotifications, setSocketNotifications] = useState([]);
    const allNotifications = useMemo(() => {
        return[...socketNotifications, ...(notifications??[])]
    })
    useEffect(() => {
        fetchUserNotifications();
    }, [])
    useEffect(()=> {
        socket.on("getNotification", (notification) => {
            if(!isOpen) {
                setNumNewNotifs(prev => prev + 1);
            }
            const newNotification = {
                type : notification.type,
                description : notification.description,
                id : notification.id
            }
            setSocketNotifications(prev => [newNotification, ...prev])
        })
        return () => {
            socket.off("getNotification");
        }
    }, [isOpen]);
    
    const openModal = () => {
        setNumNewNotifs(0);
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <div style={{display:"inline-block"}}>
            <button style={ {backgroundColor: numNewNotifs!==0 ? "red" : "green"}} onClick={openModal}>
                {numNewNotifs===0 ? "Notifications" : `New Notifications: ${numNewNotifs}`}
            </button>
            {isOpen && 
                <div id="selectRecipientModal" className="modal">
                    <div
                        className="modal-content"
                        style={{
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "80%",
                        overflowY: "scroll",
                        }}
                    >
                        <button  onClick={closeModal}>X</button>
                    {allNotifications?.map((notification) => {
                    return <Notification key={notification.id} title={notification.type} description={notification.description}/>
                    })}
                    {/* {notifications?.map((notification) => {
                    return <Notification key={notification.id} title={notification.type} description={notification.description}/>
                    })} */}
                </div>
            </div>
            }
        </div>
    )

}

export default NotificationComponent;