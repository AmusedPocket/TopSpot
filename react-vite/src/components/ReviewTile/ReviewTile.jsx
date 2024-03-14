import { NavLink, useNavigate } from "react-router-dom";
import StarRatings from "../StarRatings/StarRatings";
import './ReviewTile.css'
import { thunkHeart, thunkLbulb, thunkSad, thunkThumb } from "../../redux/reviews";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ReviewTile = ({ review }) => {
    const currentUser = useSelector((state)=>state.session.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [canHeart, setCanHeart] = useState(false)
    const [currentHeart, setCurrentHeart] = useState(0)
    const [canLbulb, setCanLbulb] = useState(false)
    const [currentLbulbs, setCurrentLbulbs] = useState(0)
    const [canSad, setCanSad] = useState(false)
    const [currentSad, setCurrentSad] = useState(0)
    const [canThumb, setCanThumb] = useState(false)
    const [currentThumb, setCurrentThumb] = useState(0)
    const imageLink = Object.values(review.images)[0]?.url
    
    useEffect(()=>{
        if(review) {
            setCurrentLbulbs(review.lbulbs);
            setCurrentHeart(review.hearts);
            setCurrentThumb(review.thumbs);
            setCurrentSad(review.sads)
        }
    }, [review])
    // updated status
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
    
    return (
        <div className="review-tile"
            style={{
                backgroundImage: `url(${imageLink})`,
            }}>

            <div className="container">
                <div className="user-info">
                    <i className="fa-solid fa-user" />
                    <div className="r-div">
                        <p className="name">
                            {review.user.first_name} {review.user.last_name[0]}.

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
              
                    <div className="icon">
                     <button onClick={()=>lBulbClick()} disabled={canLbulb || !currentUser}>
                            {currentLbulbs}&nbsp;
                            <i
                                className="fa-regular fa-lightbulb fa-xl"
                                
                            />
                        </button>
                        </div>
                    <div className="icon">
                        <button onClick={()=>thumbClick()} disabled={canThumb || !currentUser}>
                            {currentThumb}&nbsp;
                            <i
                                className="fa-regular fa-thumbs-up fa-xl"
                            />
                            </button>
                    </div>
                    <div className="icon">
                        <button onClick={()=>heartClick()} disabled={canHeart || !currentUser}>
                            {currentHeart}&nbsp;
                            <i
                                className="fa-regular fa-heart fa-xl"
                            />
                            </button>
                    </div>
                    <div className="icon">
                        <button onClick={()=>sadClick()} disabled={canSad || !currentUser}>
                            {currentSad}&nbsp;
                            <i
                                className="fa-regular fa-face-sad-tear fa-xl"
                            />
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default ReviewTile;