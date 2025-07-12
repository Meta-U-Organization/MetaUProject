import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useAllRequests () {
    const { fetchData, data, loading, errorMsg } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchAllRequests = () => {
        fetchData(`${backendUrl}/allRequests`, "GET");
    }
    const requests = data;
    const loadingRequests = loading;
    const errorMsgRequest = errorMsg;

    return {fetchAllRequests, requests, loadingRequests, errorMsgRequest}
}