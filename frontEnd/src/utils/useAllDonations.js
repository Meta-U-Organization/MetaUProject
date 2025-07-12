import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useAllDonations () {
    const { fetchData, data, loading, errorMsg } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchAllDonations = (signedInUser) => {
        fetchData(`${backendUrl}/allDonations/${signedInUser}`, "GET");
    }
    const donations = data;

    return {fetchAllDonations, donations, loading, errorMsg}
}