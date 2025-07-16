import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useAllPossibleRecipients (userId, postId) {
    const { fetchData, data} = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchAllPossibleRecipients = () => {
        fetchData(`${backendUrl}/users/${userId}/donations/${postId}/possibleRecipients`, "GET");
    }
    const possibleRecipients = data;

    return {fetchAllPossibleRecipients, possibleRecipients}
}