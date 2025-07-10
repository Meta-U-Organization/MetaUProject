import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useAllPosts () {
    const { fetchData, data, loading, errorMsg } = useCCFetch();
    const donations = [];
    const requests = [];
    const { backendUrl } = useContext(Context);
    const fetchAllPosts = () => {
        fetchData(`${backendUrl}/users`, "GET");
    }
    const users = data;
    users?.map((user) => {
        for(let i = 0; i < user.donationPosts.length; i++){
            donations.push(user.donationPosts[i]);
        }
        for(let j = 0; j < user.requestPosts.length; j++){
            requests.push(user.requestPosts[j]);
        }
    })

    return {fetchAllPosts, donations, requests, loading, errorMsg}
}