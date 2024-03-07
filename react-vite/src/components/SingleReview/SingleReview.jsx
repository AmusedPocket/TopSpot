
import StarRatings from "../StarRatings/StarRatings";

import './SingleReview.css'

const SingleReview = ({ review, userEmail}) => {


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
        if(day === 1 || day === 21 || day === 31){
            daySuffix = "st"
        } else if (day === 2 || day === 22){
            daySuffix = "nd"
        } else if (day === 3 || day === 23){
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
                </div>
            </div>
            <StarRatings rating={rating} />
            <p className="review-body">{body}</p>
            <div className='review-tile-icon-bar'>
                {["fa-regular fa-lightbulb fa-xl",
                    "fa-regular fa-thumbs-up fa-xl",
                    "fa-regular fa-heart fa-xl",
                    "fa-regular fa-face-sad-tear fa-xl"].map((className, index) => (
                        <div className="review-tile-icon" key={index}>
                            <i
                                onClick={() => alert("Feature coming soon!")}
                                className={className}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default SingleReview;