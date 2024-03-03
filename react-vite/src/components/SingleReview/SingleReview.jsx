import { useNavigate } from "react-router";
import { useModal } from "../../context/Modal";
import StarRatings from "../StarRatings/StarRatings";


const SingleReview = ({review, userEmail, business, aboutMe}) => {
    const navigate = useNavigate()

    const {user, rating, body} = review
    const {setModalContent} = useModal()

    const userOwned = userEmail === user.email

    const style = () => {
        if(!userOwned) return {};
        if(aboutMe) return {outline: "2px solid #494BE2"}
        return {
            outline: "2px solid #00B382"
        }
    }

    return (
        <div className="review-feed-item" style={{...style()}}>
            <div className="name-tag">
                {!aboutMe && <i className="fa-solid fa-user" />}

                {userOwned && aboutMe ? (
                    <p 
                        onClick={() =>nagivate(`/spot/${spot.id}`)}
                        style={{
                            cursor: "pointer",
                            marginLeft: "0",
                            color: "#002E82",
                            fontSize: "28px",
                            fontFamily: `"Roboto Condensed", sans-serif`,
                        }}
                        >
                            {spot.name}
                        </p>
                ): userOwned ? (
                    <p>You</p>
                ) : (
                    <p>
                        {user.first_name} {user.last_name[0]}.
                    </p>
                )}
                <i className="fa-solid fa-square-pen"></i>
            </div>

            <StarRatings rating={rating}/>
            <p className="review-body">{body}</p>
        </div>
    )
}

export default SingleReview;