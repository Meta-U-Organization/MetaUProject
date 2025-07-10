import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useLogin () {
    const { fetchData, data, errorType, errorMsg} = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchLogin = async(body) => {
        await fetchData(`${backendUrl}/login`, "POST", body);
    }
    const confirmMessage = data?.message;
    const user = data?.user;
    return {fetchLogin, confirmMessage, user, errorType, errorMsg}
}