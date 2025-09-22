import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { resData_URL } from "../utilis/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utilis/useOnlineStatus";

const Body = () => {
  // Initialize state with the array of restaurants, not the whole resList
  const[initialList,setInitialList] = useState([])
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(resData_URL);
    const json = await data.json();
    console.log(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    setListOfRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setInitialList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )
  };
  console.log("Render Ui....");

  // conditional rendering......

  // NOT A GOOD PRACTICE...
  // if(listOfRestaurant.length === 0){
  //   return <h1>loading.....</h1>
  // }

  // if(listOfRestaurant.length === 0){
  //   return <Shimmer/>
  // }

  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false){
    return (
      <h1>
        you are offline !! Please check your Internet Connection.....
      </h1>
    )
  }

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
          />
          <button
            onClick={() => {
              console.log(searchData);
              const filteredLists = initialList.filter((res) =>
                res.info.name.toLowerCase().includes(searchData.toLowerCase())
              );
              setListOfRestaurant(filteredLists);
            }}
          >
            search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            // Filter restaurants with avgRating > 4
            const filteredList = initialList.filter(
              (r) => Number(r.info.avgRating) > 4
            );
            setListOfRestaurant(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>

      <div className="res-container">
        {listOfRestaurant.map((restaurant) => (
          <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id}><RestaurantCard resData={restaurant} /></Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
