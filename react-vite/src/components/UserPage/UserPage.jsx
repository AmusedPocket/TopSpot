import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { thunkGetUserReviews } from "../../redux/reviews";
import AccountImages from "./PostedImages/PostedImages";
import UserDetails from "./UserDetails/UserDetails";
import ReviewListings from "../ReviewListings/ReviewListings";

const UserPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = useSelector((state) => state.session.user)

    const userReviews = useSelector((state) => state.reviews.userReviews)
    console.log("User reviews are: ", userReviews)
    const [loaded, setLoaded] = useState(false)

    useEffect(()=> {
        if(!user) navigate('/');
        else dispatch(thunkGetUserReviews()).then(()=> setLoaded(true))
    }, [dispatch, navigate, user])

    if(!loaded) return (<>Loading...</>)

    return (
        <div className="user-page">
            <div className="user-image">
                <div className="user">
                    <h1>User Information</h1>
                    <UserDetails user={user}/>
                </div>
                <div className="images">
                    <h1>My posted images</h1>
                    <AccountImages user={user}/>
                </div>
            </div>

            <div className="user-reviews">
                <h1>Posted Reviews</h1>
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
        </div>
    )
}

export default UserPage;