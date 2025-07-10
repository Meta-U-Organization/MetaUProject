import { useState } from "react";

export default function useCCFetch () {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const[errorType, setErrorType] = useState(null);
    const[errorMsg, setErrorMsg] = useState(null);
    const fetchData = async(url, method, body) => {
        setLoading(true);
        const backendCall = await fetch(url, {
            credentials: "include",
            method: method,
            headers: { "Content-Type": "application/json" },
            ...(body!==null ? {body}: {})
        });
        
        const newData = await backendCall.json();
        if(backendCall.status!==200){
            setErrorType(backendCall.status)
            setErrorMsg(newData.message)
            setData(null)
        }else {
            setErrorType(null)
            setErrorMsg(null)
            setData(newData)
        }
        setLoading(false);
    }
    return({loading, fetchData, data, errorType, errorMsg});
}


