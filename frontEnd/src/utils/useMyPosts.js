import { useContext, useState } from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useMyPosts (userId) {
    const { fetchData, data, loading } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchMyPosts = () => {
        fetchData(`${backendUrl}/users/${userId}`, "GET");
    }
    
    const donations = data?.donationPosts;
    const requests = data?.requestPosts;
    
    return {fetchMyPosts, donations, requests, loading}
}