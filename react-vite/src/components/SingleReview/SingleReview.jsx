
import { useEffect, useState } from "react";
import StarRatings from "../StarRatings/StarRatings";
import { thunkHeart, thunkLbulb, thunkSad, thunkThumb } from "../../redux/reviews";
import './SingleReview.css'

import { useDispatch, useSelector } from "react-redux";
import { thunkFollow } from "../../redux/follows";

const SingleReview = ({ review, userEmail }) => {
    const currentUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const [canHeart, setCanHeart] = useState(false)
    const [currentHeart, setCurrentHeart] = useState(0)
    const [canLbulb, setCanLbulb] = useState(false)
    const [currentLbulbs, setCurrentLbulbs] = useState(0)
    const [canSad, setCanSad] = useState(false)
    const [currentSad, setCurrentSad] = useState(0)
    const [canThumb, setCanThumb] = useState(false)
    const [currentThumb, setCurrentThumb] = useState(0)
    const [canFollow, setCanFollow] = useState(false)
    const [isCurrentUserFollowing, setIsCurrentUserFollowing] = useState(false)

    const { user, rating, body, created_at } = review

    const formatDate = (uglyDate) => {
        const newDate = new Date(uglyDate)
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        const day = newDate.getDate()
        const month = months[newDate.getMonth()]
        const year = newDate.getFullYear()

        let daySuffix;
        if (day === 1 || day === 21 || day === 31) {
            daySuffix = "st"
        } else if (day === 2 || day === 22) {
            daySuffix = "nd"
        } else if (day === 3 || day === 23) {
            daySuffix = "rd"
        } else {
            daySuffix = "th"
        }

        return `${month} ${day}${daySuffix}, ${year}`
    }

    const happyDate = formatDate(created_at)

    const userOwned = userEmail === user.email

    const style = () => {
        if (!userOwned) return { outline: "2px solid red" };

        return {
            outline: "2px solid #00B382"
        }
    }

    useEffect(() => {
        if (review) {
            setCurrentLbulbs(review.lbulbs);
            setCurrentHeart(review.hearts);
            setCurrentThumb(review.thumbs);
            setCurrentSad(review.sads);
            setIsCurrentUserFollowing(isFollowing(review.user));
        }
    }, [review, currentUser])

    const heartClick = () => {

        setCanHeart(true)

        dispatch(thunkHeart(review.id, currentUser))
            .then(result => {
                const heartUpdate = currentHeart + result;
                setCurrentHeart(heartUpdate)
                setCanHeart(false)
            })
    }

    const lBulbClick = () => {
        setCanLbulb(true)

        dispatch(thunkLbulb(review.id, currentUser))
            .then(result => {

                const lBulbUpdate = currentLbulbs + result


                setCurrentLbulbs(lBulbUpdate)
                setCanLbulb(false)
            })
    }

    const thumbClick = () => {
        setCanThumb(true)
        dispatch(thunkThumb(review.id, currentUser))
            .then(result => {
                const thumbUpdate = currentThumb + result
                setCurrentThumb(thumbUpdate)
                setCanThumb(false)
            })
    }

    const sadClick = () => {
        setCanSad(true)
        dispatch(thunkSad(review.id, currentUser))
            .then(result => {
                const sadUpdate = currentSad + result
                setCurrentSad(sadUpdate)
                setCanSad(false)
            })
    }

    console.log("review is: ------->", review.user.id)
    console.log("current user is: .......>>>", currentUser)
    const followClick = () => {
        setCanFollow(true);
        dispatch(thunkFollow(currentUser, review.user))
            .then(() => {
                setCanFollow(false);
                setIsCurrentUserFollowing(prevState => !prevState); // Toggle the state based on previous state
            });
    };

    const isFollowing = (userToCheck) => {
        if (!currentUser || !currentUser.follows) return false;
        return currentUser.follows.hasOwnProperty(userToCheck.id);
    };

    return (
        <div className="review-feed-item" style={{ ...style() }}>
            <div className="r-header-wrap">
                <div className="name-tag">
                    <i className="fa-solid fa-user" />

                    {userOwned ? (<p>Your Review </p>
                    ) : (
                        <>
                            {user.first_name} {user.last_name[0]}.

                        </>


                    )}
                    <p>&nbsp;on {happyDate}.</p>
                    {currentUser && review.user && currentUser.id !== review.user.id && !isCurrentUserFollowing && (
                        <div className="follow-user" title="Click to follow user!">
                            <button onClick={followClick} disabled={canFollow || !currentUser} className="follow-user-button">
                                <i className="fa-solid fa-user-plus follow-user-button" />
                            </button>
                        </div>
                    )}

                    {isCurrentUserFollowing && (
                        <>
                            <i className="fa-solid fa-star follow-user-star" title="Followed user review" />
                            <div className="follow-user" title="Click to unfollow user!">
                                <button onClick={followClick} disabled={canFollow || !currentUser} className="follow-user-button">
                                    <i className="fa-solid fa-user-minus follow-user-button" />
                                </button>
                            </div>
                        </>
                    )}


                </div>
            </div>
            <StarRatings rating={rating} />
            <p className="review-body">{body}</p>
            <div className='review-tile-icon-bar'>
                {/* {["fa-regular fa-lightbulb fa-xl",
                    "fa-regular fa-thumbs-up fa-xl",
                    "fa-regular fa-heart fa-xl",
                    "fa-regular fa-face-sad-tear fa-xl"].map((className, index) => (
                        <div className="review-tile-icon" key={index}>
                            <i
                                onClick={() => alert("Feature coming soon!")}
                                className={className}
                            />
                        </div>
                    ))} */}

                <button className="review-tile-icon" onClick={() => lBulbClick()} disabled={canLbulb || !currentUser}>
                    {currentLbulbs}&nbsp;
                    <i
                        className="fa-regular fa-lightbulb fa-xl review-icon"

                    />
                </button>


                <button className="review-tile-icon" onClick={() => thumbClick()} disabled={canThumb || !currentUser}>
                    {currentThumb}&nbsp;
                    <i
                        className="fa-regular fa-thumbs-up fa-xl"
                    />
                </button>


                <button className="review-tile-icon" onClick={() => heartClick()} disabled={canHeart || !currentUser}>
                    {currentHeart}&nbsp;
                    <i
                        className="fa-regular fa-heart fa-xl"
                    />
                </button>


                <button onClick={() => sadClick()} disabled={canSad || !currentUser} className="review-tile-icon">
                    {currentSad}&nbsp;
                    <i
                        className="fa-regular fa-face-sad-tear fa-xl"
                    />
                </button>

            </div>
        </div>
    )
}

export default SingleReview;