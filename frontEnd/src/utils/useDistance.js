import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function useDistance() {
    const { fetchData, data, loading } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchDistance = (body) => {
        fetchData(`${backendUrl}/distance`, "POST", body);
    }
    
    const distance = data?.rows[0].elements[0].distance.text;
    
    return {fetchDistance, distance, loading}
}