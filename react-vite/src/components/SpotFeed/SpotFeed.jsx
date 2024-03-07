import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetAllSpots } from "../../redux/spot";
import SpotFeedItem from "./SpotFeedItem/SpotFeedItem";
import './SpotFeed.css'
import Loading from "../Form/Loading/Loading";
const SpotFeed = () => {
    const dispatch = useDispatch()
    const { category } = useParams()
    const spots = useSelector((state) => state.spot.allSpots)
    const spotsCategory = Object.values(spots)
    console.log("spots are: ", spots)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(thunkGetAllSpots(category)).then(() => setLoaded(true))
    }, [category, dispatch])

    const catIcon = {
        Restaurants: "fa-utensils",
        Shopping: "fa-store",
        "Active Life": "fa-person-walking",
        Health: "fa-file-medical"
    }

    if (!loaded) return (<Loading />)

    return (
        <>
            <h1 className="spot-feed-title">
                <i className={`spot-feed-icon fa-solid ${catIcon[category]} fa-lg`} />
                {category.split("").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")}{" "}
            </h1>

            <div className="spot-feed-card">
                {spotsCategory.reverse().map((spot) => (
                    <NavLink
                        key={spot.id}
                        className="spot-feed-link"
                        to={`/spot/${spot.id}`}
                    >
                        <SpotFeedItem spot={spot} />
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default SpotFeed;