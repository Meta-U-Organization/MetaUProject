
import { useContext } from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useUpdateUser(userId) {
    const { fetchData, errorMsg, data } = useCCFetch();

    const { backendUrl } = useContext(Context);
    const fetchUpdateUser = async (body) => {
        await fetchData(`${backendUrl}/users/${userId}`, "PATCH", body);
    }

    return { fetchUpdateUser }
}