import { useContext } from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useCreatePossibleRecipient(userId, postId) {
    const { fetchData, loading } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchCreatePossibleRecipient = (body) => {
        fetchData(`${backendUrl}/users/${userId}/donations/${postId}/possibleRecipients`, "POST", body);
    }

    return { fetchCreatePossibleRecipient, loading }
}