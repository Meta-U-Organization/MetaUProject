import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function usePreferredMeetLocation (userId) {
    const { fetchData, data, loading } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchPreferredMeetLocation = () => {
        fetchData(`${backendUrl}/users/${userId}`, "GET");
    }
    const meetLocation = data?.preferredMeetLocation;
    return {fetchPreferredMeetLocation, meetLocation, loading}
}