import { useState } from "react";

export default function useCCFetch () {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const[errorMsg, setErrorMsg] = useState(null);
    const sampleData = {
        title: "",
        description: "",
        photo: "",
        useState: "",
        userId: 0
    };
    const fetchData = async(url, method, body) => {
        setLoading(true);
        const backendCall = await fetch(url, {
            credentials: "include",
            method: method,
            headers: { "Content-Type": "application/json" },
            body: body==null ?  JSON.stringify(sampleData) : body,
        });
        if(backendCall.status!==200){
            setErrorMsg(backendCall.status)
        }else {
            setData(await backendCall.json())
        }
        setLoading(false);
    }
    return({loading, fetchData, data, errorMsg});
}
