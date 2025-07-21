import { useEffect } from "react";
import "./App.css";
import Navigation from "./components/nav";
import Notification from "./components/notification";
import useUserNotifications from "./utils/useUserNotifications";
import { useContext } from "react";
import { Context } from "./App";
//main page layout for the page
function NotificationsPage() {
    const {user} = useContext(Context);
    const { fetchUserNotifications, notifications, loading} = useUserNotifications(user.id);
    useEffect(() => {
        fetchUserNotifications()
    }, [])

    return (
        <div>
        <header>
            <Navigation />
            <h1>Notifications</h1>
        </header>
        <main>
            {loading ? <h1>Loading...</h1> : notifications?.map((notification) => {
                return <Notification key={notification.id} title={notification.type} description={notification.description}/>
            })}
        </main>
        <footer>
            Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
        </footer>
        </div>
    );
}

export default NotificationsPage;
