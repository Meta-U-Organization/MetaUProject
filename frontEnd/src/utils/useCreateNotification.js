import { useContext } from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useCreateNotification(userId) {
    const { fetchData, data, loading } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchNotificationCreation = (body) => {
        fetchData(`${backendUrl}/users/${userId}/notifications`, "POST", body);
    }

    return { fetchNotificationCreation, loading }
}