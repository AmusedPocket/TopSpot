import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import { thunkLogin } from "../../redux/session";
import SpotForm from "../SpotForm/SpotForm";


function Navigation({isLoaded}) {
  const dispatch = useDispatch()

  const {setModalContent} = useModal()

  const sessionUser = useSelector((state) => state.session.user)

  useEffect(() => {}, [sessionUser])

  const demoUserLogin = async (e) => {
    e.preventDefault();
    
    await dispatch(thunkLogin({email: "demo@aa.io", password: "password"}));

    
  }

  return (
    <div className="navigation-bar-div">
      
        <NavLink to="/"><img src="https://topspots.s3.us-west-1.amazonaws.com/logo.png" className="navigation-bar-logo"/></NavLink>
  
        <div className="search-bar">
          <input
          className="search-bar-input"
          type="text"
          placeHolder="Search Top Spots!"
          />
          <i 
          className="fa-brands fa-searchengin"
          onClick={()=>{
            alert("Feature coming soon!")
          }} 
          />
        </div>
       
        {isLoaded && sessionUser ? (
          <div className="profile-div">
            <p className="add-spot"
              onClick={() => setModalContent(<SpotForm/>)} >
                Add a Spot
              </p>
              <ProfileButton user={sessionUser} />
          </div>
        ) : (
          <div className="logged-out">
            <p onClick={demoUserLogin}>Demo User Log In</p>
            
            <OpenModalMenuItem
              itemText={"Log In"}
              modalComponent={<LoginFormModal/>}
              color={"black"}
            />
            <OpenModalMenuItem
              itemText={"Sign Up"}
              modalComponent={<>Sign up page here</>}
            />
            </div>
        )}
        <ProfileButton />
      
    </div>
  );
}

export default Navigation;
