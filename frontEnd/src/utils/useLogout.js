import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useLogout () {
    const { fetchData} = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchLogout = async() => {
        await fetchData(`${backendUrl}/logout`, "POST");
    }
    return {fetchLogout}
}