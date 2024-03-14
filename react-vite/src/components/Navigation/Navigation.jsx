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
import SignupFormPage from "../SignupFormPage/SignupFormPage";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch()

  const { setModalContent } = useModal()

  const sessionUser = useSelector((state) => state.session.user)

  useEffect(() => { }, [sessionUser])

  const demoUserLogin = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogin({ credential: "Demo", password: "password" }));


  }

  return (
    <div className="navigation-bar-div">

      <NavLink to="/"><img src="https://topspots.s3.us-west-1.amazonaws.com/logo.png" className="navigation-bar-logo" /></NavLink>

      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search Top Spots!"
        />
        <i
          className="fa-brands fa-searchengin"
          onClick={() => {
            alert("Feature coming soon!")
          }}
        />
      </div>
      <div className="profile-div">
        {isLoaded && sessionUser ? (<>
          
            <p className="logged-out-buttons"
              onClick={() => setModalContent(<SpotForm/>)} >
                Create a Spot
              </p>
              <ProfileButton user={sessionUser} />
          </>
        ) : (
          <>
          <div className="logged-out">
            <p className="logged-out-buttons" onClick={demoUserLogin}>Demo User Log In</p>

            <OpenModalMenuItem
              itemText={"Log In"}
              modalComponent={<LoginFormModal />}
              color={"black"}
              className="logged-out-buttons"
            />
            <OpenModalMenuItem
              itemText={"Sign Up"}
              modalComponent={<SignupFormPage />}
              color={"black"}
              className="logged-out-buttons"
            />
          </div>
          </>)}
      </div>
    </div>
  );
}

export default Navigation;
