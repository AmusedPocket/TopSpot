import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileImage from "../Form/ProfileImage/ProfileImage";

function ProfileButton({user}) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const divClassName = "profile-dropdown" + (showMenu ? "" : " hidden")

  return (
    <div className="profile-button-div">
      <ProfileImage props={{onClick: toggleMenu}} />

      <div className={divClassName} ref={ulRef}>

      {user && (
        <>
          <div className="profile-header">
            <p>{user.first_name} {user.last_name[0]}.</p>
          </div>

          <p
            className="about"
            onClick={() => {
            setShowMenu(false);
            navigate('/user');
            }}>
              <i className="fa-solid fa-user"/>
                User Profile
            </p>

            <p className="logout" onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"/>
              Sign Out
            </p>
        </>
      )}
      </div>
    </div>
  )
}
     

export default ProfileButton;
