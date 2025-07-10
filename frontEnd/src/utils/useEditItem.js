import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useEditItem (userId, postType, itemId) {
    const { fetchData} = useCCFetch();

    const { backendUrl } = useContext(Context);
    const fetchEdit = async(body) => {
        await fetchData(`${backendUrl}/users/${userId}/${postType}/${itemId}`, "PUT", body);
    }

    return {fetchEdit}
}