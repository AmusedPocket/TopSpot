import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { thunkGetUserReviews } from "../../redux/reviews";
import AccountImages from "./PostedImages/PostedImages";
import UserDetails from "./UserDetails/UserDetails";
import ReviewListings from "../ReviewListings/ReviewListings";
import Loading from "../Form/Loading/Loading";
import {NavLink} from "react-router-dom";




const UserPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = useSelector((state) => state.session.user)
    const likedSpots = Object.values(user.user_liked_spots)
    const userReviews = useSelector((state) => state.reviews.userReviews)
    const follows = Object.values(user.follows)
   
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!user) navigate('/');
        else dispatch(thunkGetUserReviews()).then(() => setLoaded(true))
    }, [dispatch, navigate, user])

    if (!loaded) return (<Loading />)
  


    return (
        <div className="user-page">
            <div className="user-image">
                <div className="user">
                    <h1>User Information</h1>
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
                        <ReviewListings
                            key={review.id}
                            review={review}
                            userEmail={user.email}
                            spot={review.spot}
                            aboutMe={true}
                        />
                    ))}
                </div>
            </div>
            <div className="follower-reviews">
                <h1>Followed Users reviews':</h1>
                {follows.map((follow) => (
                    <div key={follow.id}>
                        <h3>{`${follow.first_name} ${follow.last_name[0]}`}.</h3>
                        {Object.values(follow.reviews).map((review) => (
                            <NavLink to={`/spot/${review.spot.id}`}>
                            <div key={review.id}>
                                <p>{review.body}</p>
                                <p>{review.spot.title}</p>
                              
                                {/* Include additional review details as needed */}
                            </div>
                            </NavLink>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserPage;