import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRandomReviews } from "../../redux/reviews";


const LandingPage = () => {
    const dispatch = useDispatch();

    let reviews = useSelector((state) => state.reviews.randomReviews)
    reviews = Object.values(reviews)

    const [loaded, setLoaded] = useState(false);

    useEffect(()=> {
        dispatch(getRandomReviews(10)).then(()=> setLoaded(true))
    }, [dispatch]);

    if(!loaded) return null;

    const categoryImages = reviews.map((review) => Object.values(review.images)[0]?.url)

    return (
        <div className="landing-page">
            <h1 className="title">Categories</h1>
            <div className="categories">
                {["Restaurants", "Shopping", "ActiveLife", "Health"].map(
                    (category, index) => (
                        <CategoryCard key={index} category={category} url={categoryImages[index]} />
                    )
                )}
            </div>

            <h1 className="title">Recent Activitiy</h1>
            <div className="reviews">
                {reviews.slice(0, 6).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    )
}

export default LandingPage;