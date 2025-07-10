import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function usePostCreation (userId, type) {
    const { fetchData, data, loading } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchPostCreation = (userId, body, type) => {
        fetchData(`${backendUrl}/users/${userId}/${type}`, "POST", body);
    }
    
    return {fetchPostCreation, loading}
}