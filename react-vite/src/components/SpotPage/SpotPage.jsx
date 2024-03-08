import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SingleReview from "../SingleReview/SingleReview";
import SpotForm from "../SpotForm/SpotForm";
import { useModal } from "../../context/Modal";
import { thunkGetSpot } from "../../redux/spot";
import StarRatings from "../StarRatings/StarRatings";
import Loading from "../Form/Loading/Loading";
import './SpotPage.css'
import ReviewForm from "../ReviewForm/ReviewForm";
import UploadReviewImages from "../UploadImages/UploadReviewImages";

import LoginFormModal from "../LoginFormModal";
import Delete from "../Form/Delete/Delete";
import { thunkDeleteReview } from "../../redux/reviews";


const reviewedAlready = (user, reviews) => {
    reviews = Object.values(reviews)
    for (const review of reviews) {
        if (review.user.email === user.email) {
            return review;
        }
    }
    return false;
}

const happyPhone = number => {
    number = number.replace(/\D/g, '');

    return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

const SpotPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.session)

    const { setModalContent } = useModal();

    const { spotId } = useParams()

    const spot = useSelector((state) => state.spot.currSpot)

    console.log("spot is: ", spot)
    const { title, description, category, address, reviews, avg_rating, images, phone } = spot



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

    if (!loaded) return (<Loading />)




    const style = () => {
        if (Object.values(images).length === 0) return {
            backgroundImage: `linear-gradient(
                to right,
                rgba(0, 0, 0, 0.5),
                rgba(255, 255, 255, 0.5)
              ), url('https://topspots.s3.us-west-1.amazonaws.com/logo.png')`
        };

        return {
            backgroundImage: `linear-gradient(90deg, black, transparent), url(${Object.values(images)[Math.floor(Math.random() * Object.values(images).length)].url})`,
        }
    }


    console.log("images are: ", Object.values(images))
    const numOfReviews = Object.values(reviews).length
    const reviewWord = numOfReviews !== 0 ? "review" : "Brand new spot! Be the first to review!"
    const reviewPlural = numOfReviews > 1 ? "s" : ""
    const reviewString = `${numOfReviews !== 0 ? numOfReviews : ""} ${reviewWord}${reviewPlural}`

    return (
        <div className="spot-page">
            <div className="top-bar" style={{ ...style() }}>
                <div className="spot-page-title">

                    <h1>{title}</h1>
                    {user?.id === spot.owner_id && (
                        <p className="update-spot-button" onClick={() => setModalContent(<SpotForm spot={spot} />)}><i className="fa-solid fa-pen-to-square page-icon" />  &nbsp;&nbsp;Update your spot!

                        </p>)}


                    <div className="add-review-wrap">
                        {user && hasBeenReviewed ? (
                            <div className="review-exists">
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
                                    setModalContent(<ReviewForm spot={spot} review={hasBeenReviewed} />)} >
                                <i className="fa-regular fa-star" />
                                    Update your review!
                                </button>
                                <div
                                    className="delete-review-spot-page"
                                    title="Delete your review."
                                    onMouseEnter={() => {
                                        const trash = document.querySelector(".fa-trash");
                                        trash.className = "fa-solid fa-trash fa-bounce"
                                    }}
                                    onMouseLeave={() => {
                                        const trash = document.querySelector(".fa-trash");
                                        trash.className = "fa-solid fa-trash"
                                    }}
                                    onClick={() => setModalContent(
                                        <Delete
                                            spot={spot}
                                            thunk={thunkDeleteReview}
                                            item={reviewedAlready(user, reviews)}
                                        />
                                    )}
                                >
                                    <i className="fa-solid fa-trash" />
                                </div>
                            </div>
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
                                    setModalContent(<ReviewForm spot={spot} review={hasBeenReviewed} />)} >
                                <i className="fa-regular fa-star" />
                                Submit a review!
                            </button>
                        ) : (
                            <button className="add-review" onClick={() => setModalContent(<LoginFormModal />)}>
                                Log in to review!
                            </button>
                        )}
                    </div>
                </div>

                <div className="average-rating-top">
                    <StarRatings rating={Math.round(Number(avg_rating))} />
                    <p className="spot-reviews">
                        &nbsp;&nbsp;{reviewString}
                    </p>
                </div>

                <p className="category">
                    <i className={`fa-solid ${catIcon[category]} page-icon`} />
                    &nbsp;&nbsp;{category[0].toUpperCase() + category.slice(1)}
                </p>

                <div className="bottom-bit">
                    <div className="address-block">
                        <i className="fa-solid fa-location-dot page-icon" />
                        <div className="address">
                            &nbsp;&nbsp;{address}
                        </div>
                    </div>
                    <p className="phone-block">
                        <i class="fa-solid fa-phone page-icon"></i>
                        <div className="phone">
                            &nbsp;&nbsp;{happyPhone(phone)}
                        </div>
                    </p>
                    <div className="upload-image-button"
                        style={{ visibility: user ? "visible" : "hidden" }}
                        onClick={() => {
                            if (user) setModalContent(<UploadReviewImages spotId={spotId} />)
                        }} >
                        <div className="upload-image-text">
                            <i className="fa-solid fa-image page-icon" />
                            <p className="upload-image-text-text">&nbsp;&nbsp;Upload an image!</p></div>

                    </div>
                </div>
            </div>

            <div className="description-about">

                <p className="description-title">About this spot:</p>
                <div className="description-body">{description}</div>

            </div>

            <div className="featured-reviews">
                <div className="review-wrap">
                    <h1 className="title">Top Reviews:</h1>

                    <div className="reviews-tile">
                        {loaded &&
                            Object.values(reviews)
                                .reverse()
                                .map((review) => (
                                    <SingleReview
                                        key={review.id}
                                        review={review}
                                        userEmail={user?.email}
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