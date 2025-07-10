import { useContext} from "react";
import useCCFetch from "./useCCFetch";
import { Context } from "../App";

export default function usePrefferedMeetLocation (userId) {
    const { fetchData, data, loading } = useCCFetch();
    const { backendUrl } = useContext(Context);
    const fetchPrefferedMeetLocation = () => {
        fetchData(`${backendUrl}/users/${userId}`, "GET");
    }
    const meetLocation = data?.preferredMeetLocation;
    return {fetchPrefferedMeetLocation, meetLocation, loading}
}