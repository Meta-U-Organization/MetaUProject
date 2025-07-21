import { useContext } from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useUserNotifications(userId) {
    const { fetchData, data, loading } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchUserNotifications = () => {
        fetchData(`${backendUrl}/users/${userId}/notifications`, "GET");
    }

    const notifications = data

    return { fetchUserNotifications, notifications, loading }
}