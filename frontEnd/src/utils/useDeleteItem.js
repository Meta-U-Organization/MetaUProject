import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useDeleteItem (userId, postType, itemId) {
    const { fetchData} = useCCFetch();

    const { backendUrl } = useContext(Context);
    const fetchDelete = async() => {
        await fetchData(`${backendUrl}/users/${userId}/${postType}/${itemId}`, "DELETE",);
    }
   
    return {fetchDelete}
}