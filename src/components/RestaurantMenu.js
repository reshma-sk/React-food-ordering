import { useEffect, useState } from "react";
import { CDN_URL, MENU_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { RestaurantMenuShimmer } from "./Shimmer";
import "../RestaurantMenu.css";
import { MdStarRate } from "react-icons/md";


const RestaurantMenu = ()=>{
    const[restaurantInfo,setRestaurantInfo] = useState(null)
    const {resId} = useParams();
    console.log(resId);
    
    const fetchMenusData = async()=>{
        try {
            const data = await fetch(MENU_URL + resId)
            const json = await data.json();
            console.log(json);   
            setRestaurantInfo(json) 
        } catch (error) {
            console.log("can not get menu",error);    
        }

    }
    useEffect(()=>{
        fetchMenusData();

    },[])
    if(restaurantInfo === null){
        return <RestaurantMenuShimmer/>

    }
    console.log(restaurantInfo?.data?.cards[2]?.card?.card?.info);
    
    const{name,cuisines,costForTwo,cloudinaryImageId,locality,avgRatingString,sla} = restaurantInfo?.data?.cards[2]?.card?.card?.info;
    const {itemCards} = restaurantInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    console.log(itemCards);
    
    
    return( 
        <div className="menu">
            <div className="restautant-header">
                <img src={CDN_URL+cloudinaryImageId} alt="" />
                <div className="restaurant-header-details">
                    <h1>{name}</h1>
                    <h3>{locality}</h3>
                    <p>{cuisines.join(', ')}</p>
                    <h4 className="rating-time">
                        <div className="rating">
                          <MdStarRate
                            className="rating-logo"
                            style={{backgroundColor:avgRatingString >= 4.0 ? "var(--green)" : "var(--red)"}}
                          />
                        </div>
                        <span className="time">{sla.slaString}</span>
                    </h4>
                </div>
            </div> 
            {itemCards.length ? (
        itemCards.map((item) => {
          const {
            id,
            name,
            price,
            defaultPrice,
            ratings,
            imageId,
            description,
          } = item.card.info;
          return (
            <div key={id} className="menu-items">
              <div className="left">
                <h2>{name}</h2>
                <h4>₹{price / 100 || defaultPrice / 100}</h4>
                <p>{description && description.slice(0, 60) || "Dummy"}</p>
                <h4 className="rating">
                  <MdStarRate
                    className="rating-logo"
                    style={{
                      backgroundColor:
                        ratings?.aggregatedRating?.rating >= 4.0
                          ? "var(--green)"
                          : "var(--red)",
                    }}
                  />
                  <span>
                    {ratings?.aggregatedRating?.rating || 3.8} (
                    {ratings?.aggregatedRating?.ratingCountV2 || 6})
                  </span>
                </h4>
              </div>
              <div className="right">
                <img src={CDN_URL + imageId} alt={name} />
                <button className="add-btn">ADD</button>
              </div>
            </div>
          );
        })
      ) : (
        <h2>No items available</h2>
      )}      
    </div>    
    )
}
export default RestaurantMenu;
