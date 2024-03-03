import { NavLink, useNavigate } from "react-router-dom";
import StarRatings from "../StarRatings/StarRatings";

const ReviewTile = ({ review }) => {
    const navigate = useNavigate()

    const imageLink = Object.values(review.images)[0].url
    console.log("review background image is: ", imageLink)
    return (
        <div className="review-tile">
            <div className="background"
                style={{
                    backgroundImage: `url(${imageLink})`
                }}
            />

            <div className="container">
                <div className="user-info">
                    <i className="fa-solid fa-user" />
                    <div className="r-div">
                        <p className="name">
                            {review.user.first_name} {review.user.last_name[0]}

                        </p>
                        <p className="wrote">Wrote a review</p>
                    </div>
                </div>
            <div className="star-ratings">
                <NavLink to={`/spots/${review.spot.id}`}>
                    {review.spot.name}
                </NavLink>
                <StarRatings rating={review.rating} />
            </div>
            </div>
            <div className="r-wrap">
                <div className="review-body">
                    <p className="body">{review.body}</p>
                    <p 
                        className="continue-review"
                        onClick={() => navigate(`/spot/${review.spot.id}`)}>
                            Continue reading review...
                        </p>
                </div>
            </div>

            <div className='icon-bar'>
                {["fa-regular fa-lightbulb fa-xl",
                    "fa-regular fa-thumbs-up fa-xl",
                    "fa-solid fa-heart fa-xl",
                    "fa-regular fa-face-sad-tear fa-xl"].map((className, index) => (
                        <div className="icon" key={index}>
                            <i 
                            onClick={()=>alert("Feature coming soon!")}
                            className={className}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ReviewTile;