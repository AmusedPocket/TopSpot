import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { thunkGetUserReviews } from "../../redux/reviews";
import AccountImages from "./PostedImages/PostedImages";
import UserDetails from "./UserDetails/UserDetails";
import ReviewListings from "../ReviewListings/ReviewListings";
import Loading from "../Form/Loading/Loading";
import { NavLink } from "react-router-dom";
import './UserPage.css'
import StarRatings from "../StarRatings/StarRatings";
import { thunkGetUser } from "../../redux/session";

const UserPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = useSelector((state) => state.session.user)

    // const likedSpots = Object.values(user.user_liked_spots)
    const userReviews = useSelector((state) => state.reviews.userReviews)
    const follows = Object.values(user.follows)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else if (!loaded) {
            console.log('Dispatching thunkGetUser');
            dispatch(thunkGetUserReviews())
                .then(() => dispatch(thunkGetUser()))
                .then(() => setLoaded(true));
        }
    }, [dispatch, navigate, user, loaded]);

    const sortedFollows = follows.slice().sort((a, b) => {
        const nameA = a.first_name.toUpperCase();
        const nameB = b.first_name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    })

    if (!loaded) return (<Loading />)

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



    return (
        <div className="user-page">
            <div className="user-image">
                <div className="user">
                    <h1>My Information:</h1>
                    <UserDetails user={user} />
                </div>
                {/* <div className="images">
                    <h1>My posted images</h1>
                    <AccountImages user={user}/>
                </div> */}
            </div>

            <div className="user-reviews">
                <h1>My Reviews:</h1>
                <div className="user-single-reviews">
                    {Object.values(userReviews).map((review) => (
                        <div className="account-page-single-review" id={review.id}>
                            <NavLink to={`/spot/${review.spot.id}`}>
                                <h3 className="account-page-single-review-title">{review.spot.title} <StarRatings rating={review.rating} /></h3>
                                <p>{review.body}</p>
                                <p>on {formatDate(review.created_at)}</p>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
            <div className="follower-reviews">
                <h1>Followed Users reviews':</h1>
                {sortedFollows.map((follow) => (
                    <div key={follow.id}>
                        <h3 className="follower-name">{`${follow.first_name} ${follow.last_name[0]}`}.</h3>
                        {Object.values(follow.reviews).map((review) => (
                            <div className="account-page-single-review" id={review.id}>
                                <NavLink to={`/spot/${review.spot.id}`}>

                                    <h3 className="account-page-single-review-title">{review.spot.title}<StarRatings rating={review.rating} /></h3>
                                    <p>{review.body}</p>
                                    <p>on {formatDate(review.created_at)}</p>

                                    {/* Include additional review details as needed */}

                                </NavLink>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserPage;