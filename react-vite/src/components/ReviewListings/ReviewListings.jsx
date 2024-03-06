import { useNavigate } from "react-router";
import { useModal } from "../../context/Modal";
import StarRatings from "../StarRatings/StarRatings";
import ReviewForm from "../ReviewForm/ReviewForm";
import ProfileImage from "../Form/ProfileImage/ProfileImage";

const ReviewListings = ({ review, userEmail, spot, aboutMe }) => {
    const navigate = useNavigate()

    const { user, rating, body } = review
    const { setModalContent } = useModal()

    const ownedByUser = userEmail === user.userEmail

    const style = () => {
        if (!ownedByUser) return {};
        if (aboutMe) return { outline: "2px solid #00ffbf" }
        return {
            outline: "2px solid #137059"
        }
    }

    return (
        <div className="review-feed-item" style={{ ...style() }}>
            <div className="user-tag">
                {!aboutMe && <ProfileImage />}

                {ownedByUser && aboutMe ? (
                    <p
                        onClick={() => navigate(`/spots/${spot.id}`)}
                        style={{
                            cursor: "pointer",
                            marginLeft: "0",
                            color: "#2bd1a8",
                            fontSize: "28px",
                            fontFamily: `"Roboto Condensed", sans-serif`,
                        }}
                    >
                        {spot.name}
                    </p>
                ) : ownedByUser ? (
                    <p>Me</p>
                ) : (
                    <p>{user.first_name} {user.last_name[0]}.</p>
                )}

                {ownedByUser && (
                    <div className="edit-button"
                    title="Edit your review?"
                    onClick={()=> 
                    setModalContent(
                        <ReviewForm spot={spot} review={review} />
                    )}
                    > 
                    <i className="fa-regular fa-pen-to-square" />
                    </div>
                )}
            </div>

            <starRatings rating={rating} />
            <p className="ratig-body">{body}</p>
        </div>
    )
}

export default ReviewListings;