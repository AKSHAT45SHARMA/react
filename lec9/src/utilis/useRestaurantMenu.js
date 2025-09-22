import { menu_API } from "./constants";
import { useEffect, useState } from "react";
 
const useRestaurantMenu = (resId) =>{
    const [resInfo,setResInfo] = useState(null);

    const fetchData = async () =>{
        const data = await fetch(menu_API+resId);
        const json = await data.json();

        setResInfo(json.data);
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return resInfo;
}

export default useRestaurantMenu;