import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utilis/useRestaurantMenu";

const RestaurantMenu = () => {

  const {resId} = useParams();

  const resInfo = useRestaurantMenu(resId);

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
