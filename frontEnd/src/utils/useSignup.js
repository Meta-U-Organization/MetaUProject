import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useSignup () {
    const { fetchData, data, errorType, errorMsg } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchSignup = async(body) => {
        await fetchData(`${backendUrl}/signUp`, "POST", body);
    }
    const confirmMessage = data?.message;
    return {fetchSignup, confirmMessage, errorType, errorMsg}
}