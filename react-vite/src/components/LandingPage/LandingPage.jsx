import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetRandomReviews} from "../../redux/reviews";
import CategoryTile from "../CategoryTile/CategoryCard";
import "./LandingPage.css"
import ReviewTile from "../ReviewTile/ReviewTile";
import Loading from "../Form/Loading/Loading";

const LandingPage = () => {
    const dispatch = useDispatch();

    let reviews = useSelector((state) => state.reviews.randomReviews)
    
    reviews = Object.values(reviews)
   
    const [loaded, setLoaded] = useState(false);

    useEffect(()=> {
        dispatch(thunkGetRandomReviews(10)).then(()=> setLoaded(true))
    }, [dispatch]);

    if(!loaded) return (<Loading/>);
 
    const categoryImages = [
        "https://topspots.s3.us-west-1.amazonaws.com/restaurant_cat.jpg",
        "https://topspots.s3.us-west-1.amazonaws.com/shopping_cat.jpg",
        "https://topspots.s3.us-west-1.amazonaws.com/activelife_cat.jpeg",
        "https://topspots.s3.us-west-1.amazonaws.com/health_cat.jpg"
    ]

    return (
        <div className="landing-page">
            
            <h1 className="title">Categories</h1>
            <div className="categories">
                {["Restaurants", "Shopping", "Active Life", "Health"].map(
                    (category, index) => (
                        <CategoryTile className="category-tile" key={index} index={index} category={category} url={categoryImages[index]} />
                    )
                )}
            </div>

            <h1 className="recent-activity">Recent Activity</h1>
            <div className="reviews">
                {reviews.slice(0, 6).map((review) => (
                    <ReviewTile key={review.id} review={review} />
                ))} 
            </div>
        </div>
    )
}

export default LandingPage;