import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkDeleteReviewImage, thunkGetUserReviewImages } from "../../../redux/review_images";

const GalleryPanel = () => {
    const dispatch = useDispatch()

    let images = useSelector((state) => state.images.userImages);
    images = Object.values(images);

    const [width, setWidth] = useState(0)
    const [load, setLoad] = useState(false)
    const [waiting, setWaiting] = useState(false)

    useEffect(() => {
        dispatch(thunkGetUserReviewImages()).then(() => setLoad(true))
    }, [dispatch])

    useEffect(() => {
        const panel = document.getElementById("panel-content")
        panel.style.padding = "0";
        panel.style.border = "3px solid #fa8500";

        const handleSize = () => {
            const container = document.querySelector(".gallery-panel")
            const width = container.offsetWidth;
            setWidth(width);
        }

        if(load) handleSize();

        window.addEventListener("resize", handleSize)
    }, [load])

    const deleteHandle = (image) => async (e) => {
        e.preventDefault();

        setWaiting(true);
        await dispatch(thunkDeleteReviewImage(image.id));
        await dispatch(thunkGetUserReviewImages())
        setWaiting(true)
        }
    
    return (
        <div 
            className="gallery-panel" 
            style={waiting ? {justifyContent: "center", alignItems: "center"} : {}}
        >
            {waiting ? (
                <div className="loading" />
            ) : (
                images.map((image, index) => (
                    <div
                        key={index}
                        className="gallery-image"
                        style={{
                            width: `${(width - 1) / 2 - 9}px`,
                            height: `${(((width - 1)/ 2 - 9) * 2) / 3}px`
                        }}
                        onClick={deleteHandle(image)}
                    >
                        {<img src={image.url} alt="gallery item" />}
                    </div>
                ))
            )}
        </div>
    )
}

const AccountImages = () => {
    const dispatch = useDispatch();
    
    
    const {setModalContent} = useModal();

    let images = useSelector((state) => state.reviewImages.userReviewImages);
    
    images = Object.values(images);
    const length = images.length;

    const [index, setIndex] = useState(0)
    const [load, setLoad] = useState(false);
    const [fade, setFade] = useState(null);

    useEffect(()=> {
        dispatch(thunkGetUserReviewImages()).then(() => setLoad(true));
    }, [dispatch])

    useEffect(() => {
        const interval = load 
            ? setInterval(() => {
                setFade("fade");
                setIndex((index + 1) % length);
                setTimeout(() => {
                    setFade(null)
                }, 0);
            }, 4000)
            : null;
        return () => clearInterval(interval)
    }, [images])

    if(!load) return <>Loading...</>

    return (
        <div
            className="user-images"
            onClick={()=> setModalContent(<GalleryPanel />)}
            >
                {length ? (
                    <img className={fade ?? "img"} src={images[index]?.url} alt="carousel" />
                ) : (
                    <p>No uploaded images</p>
                )}
            </div>
    )
}

export default AccountImages;