import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useUpdateSelected (userId) {
    const { fetchData, errorMsg } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchUpdateSelected = (body) => {
        fetchData(`${backendUrl}/selectRecipient`, "POST", body);
    }

    const updateSelectedError = errorMsg;

    
    return {fetchUpdateSelected, updateSelectedError}
}