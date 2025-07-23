import { useContext } from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useCreatePossibleRecipient(donorId, postId) {
    const { fetchData, loading } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchCreatePossibleRecipient = (body) => {
        fetchData(`${backendUrl}/users/${donorId}/donations/${postId}/possibleRecipients`, "POST", body);
    }

    return { fetchCreatePossibleRecipient, loading }
}