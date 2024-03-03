import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SingleReview from "../SingleReview/SingleReview";
import SpotForm from "../SpotForm/SpotForm";
import { useModal } from "../../context/Modal";
import { thunkGetSpot, thunkUpdateSpot } from "../../redux/spot";
import StarRatings from "../StarRatings/StarRatings";
import LoginFormPage from "../LoginFormPage";
import './SpotPage.css'

const reviewedAlready = (user, reviews) => {
    reviews = Object.values(reviews)
    for (const review of reviews) {
        if (review.user.email === user.email) {
            return review;
        }
    }
    return false;
}

const SpotPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.session)

    const { setModalContent } = useModal();

    const { spotId } = useParams()

    const spot = useSelector((state) => state.spot.currSpot)
 

    const { title, description, category, address, phone, reviews, avg_rating, images } = spot

    const [loaded, setLoaded] = useState(false)

    const catIcon = {
        Restaurants: "fa-utensils",
        Shopping: "fa-store",
        "Active Life": "fa-person-walking",
        Health: "fa-file-medical"
    }

    const hasBeenReviewed = user && reviews ? reviewedAlready(user, reviews) : null

    useEffect(() => {
        dispatch(thunkGetSpot(spotId)).then((res) => {
            if (res.errors) navigate('/')
            else setLoaded(true);
        })
    }, [dispatch, spotId, navigate])

    if (!loaded) return (<>...Loading</>)

    const style = () => {
        if (Object.values(images).length === 0) return { backgroundColor: "#9C5B38" };

        return {
            backgroundImage: `linear-gradient(90deg, black, transparent), url(${Object.values(images)[Math.floor(Math.random() * Object.values(images).length)].url})`,
        }
    }

    return (
        <div className="spot-page">
            <div className="top-bar" style={{ ...style() }}>
                <div className="title">
                    <div className="name">
                        <h1>{title}</h1>
                        {user?.id === spot.owner_id &&  (
                            <p onClick={() => setModalContent(<SpotForm spot={spot} />)}> Update your spot! </p>)}
                       
                    </div>
                    {user && hasBeenReviewed ? (
                        <button
                            className="add-review"
                            onMouseEnter={() => {
                                const star = document.querySelector(".fa-star");
                                star.className = "fa-solid fa-star"
                            }}
                            onMouseLeave={() => {
                                const star = document.querySelector(".fa-star");
                                star.className = "fa-regular fa-star"
                            }}
                            onClick={() =>
                                setModalContent(<ReviewForm business={business} review={hasBeenReviewed} />)} >
                            <i className="fa-regular fa-star" />
                            Update your review!
                        </button>
                    ) : user ? (
                        <button
                            className="add-review"
                            onMouseEnter={() => {
                                const star = document.querySelector(".fa-star");
                                star.className = "fa-solid fa-star"
                            }}
                            onMouseLeave={() => {
                                const star = document.querySelector(".fa-star");
                                star.className = "fa-regular fa-star"
                            }}
                            onClick={() =>
                                setModalContent(<ReviewForm business={business} review={hasBeenReviewed} />)} >
                            <i className="fa-regular fa-star" />
                            Submit a review!
                        </button>
                    ) : (
                        <button onClick={() => setModalContent(<LoginFormPage />)}>
                            Log in to review!
                        </button>
                    )}
                </div>

                <div className="average-rating-top">
                    <StarRatings rating={Math.round(Number(avg_rating))} />
                    <p className="reviews">
                        {Object.values(reviews).length} review
                        {Object.values(reviews).length > 1 ? "s" : ""}
                    </p>
                </div>

                <p className="category">
                    <i className={`fa-solid ${catIcon[category]}`} />
                    {category[0].toUpperCase() + category.slice(1)}
                </p>

                <div className="bottom-bit">
                    <div className="address">
                        {address}
                    </div>


                    <div className="upload-image-button"
                        style={{ visibility: user ? "visible" : "hidden" }}
                        onClick={() => {
                            if (user) setModalContent(<UploadImages spotId={spotId} />)
                        }} >
                        <i className="fa-solid fa-image">
                            <p>Upload an image!</p>
                        </i>
                    </div>
                </div>
            </div>

            <div className="about">
                <div className="description">
                    <p className="title">About this spot:</p>
                    <div className="description">{description}</div>
                </div>
            </div>

            <div className="featured-reviews">
                <div className="review-wrap">
                    <p className="title">Top Reviews:</p>

                    <div className="reviews-tile">
                        {loaded && 
                            Object.values(reviews)
                                .reverse()
                                .map((review) => (
                                    <SingleReview
                                    key={review.id}
                                    review={review}
                                    userEMail={user?.email}
                                    spot={spot}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotPage;