import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useOrderedPossibleRecipients (userId, postId) {
    const { fetchData, data} = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchOrderedPossibleRecipients = () => {
        fetchData(`${backendUrl}/users/${userId}/donations/${postId}/orderedRecipients`, "GET");
    }
    const orderedRecipients = data;
    return {fetchOrderedPossibleRecipients, orderedRecipients}
}