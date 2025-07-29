import { useContext } from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useUpdateUser(userId) {
    const { fetchData, errorMsg, data } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchUpdateUser = (body) => {
        fetchData(`${backendUrl}/users/${userId}`, "PUT", body);
    }

    const updateduser = data;


    return { fetchUpdateUser, updateduser, errorMsg }
}