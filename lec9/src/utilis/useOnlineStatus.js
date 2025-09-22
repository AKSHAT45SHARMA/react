import { useEffect,useState} from "react";

const useOnlineStatus = () =>{
    const [onlineStatus,setOnlineStatuse] = useState(true);

    useEffect(()=>{
        window.addEventListener("offline",()=>{
            setOnlineStatuse(false);
        })

        window.addEventListener("online",()=>{
            setOnlineStatuse(true);
        })

        return () => {
        window.removeEventListener("offline",()=>{
            setOnlineStatuse(false);
        });
        window.removeEventListener("online",()=>{
            setOnlineStatuse(true);
        });
    };
    },[]);

    return onlineStatus;
}

export default useOnlineStatus;