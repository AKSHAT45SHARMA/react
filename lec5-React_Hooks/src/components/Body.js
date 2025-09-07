import RestaurantCard from "./RestaurantCard";
import resList from "../utilis/mock";
import { useState } from "react";

const Body = () => {
  // LOCAL STATE VARIABLE - SUPER POWERFUL VARIABLES
  const [listOfRestaurant,setListOfRestaurant] = useState(resList);

  // normal local JS Variable 
//   let listOfRestaurant = [
//   {
//     data: {
//       name: "Kannur Food Point",
//       id:123,
//       avgRating: "3.9",
//       deliveryTime: 24,
//       costForTwo: 30000,
//       cuisines: ["Kerala", "Chinese"]
//   }
//   },
//   {
//     data: {
//       name: "Meghana Foods",
//       id:12,
//       avgRating: "4.4",
//       deliveryTime: 16,
//       costForTwo: 50000,
//       cuisines: ["Biryani","Andhra","South Indian","North Indian","Chinese","Seafood"]
//     }
//   }
// ]

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            // Filter and reassign to resList
            const filteredList = listOfRestaurant.filter((r) => Number(r.data.avgRating) > 4);
            setListOfRestaurant(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
