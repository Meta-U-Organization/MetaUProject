import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useAllPosts () {
    const { fetchData, data, loading } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchAllPosts = () => {
        fetchData(`${backendUrl}/users`, "GET");
    }
    const users = data;
    
    return {fetchAllPosts, users, loading}
}