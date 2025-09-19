import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { menu_API } from "../utilis/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const {resId} = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(menu_API+resId);
    const json = await data.json();
    console.log(json);
    setResInfo(json?.data);
  };

   const {name,costForTwoMessage,cuisines} = resInfo?.cards[2]?.card?.card?.info || [];
   const itemCards = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards || [];

  console.log(itemCards);
  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <h1>{name}</h1>
      <p>{cuisines} - {costForTwoMessage}</p>
      <h2>
        {itemCards.map((items)=>( 
            <li key={items.card.info.id}>{items.card.info.name} - {items.card.info.defaultPrice || items.card.info.price}</li>))}
      </h2>
    </div>
  );
};

export default RestaurantMenu;
