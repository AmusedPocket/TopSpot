import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";

import './ProfileButton.css'
import { useNavigate } from "react-router";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const ulRef = useRef();

  const toggleMenu = () => setShowMenu(prevState => !prevState)

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);



  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    setShowMenu(false)
  };

  const divClassName = "profile-dropdown" + (showMenu ? "" : " hidden")

  return (
    <div className="profile-button-wrapper">
      <button onClick={toggleMenu} className="profile-button">
        <i className="fa-regular fa-user" />
      </button>
      <div className={divClassName} ref={ulRef}>
        {user && (
          <>
            <div className="profile-button-header">
              <p>
                {user.first_name} {user.last_name[0]}.
              </p>
            </div>
            <p
              className="about"
              onClick={() => {
                setShowMenu(false);
                navigate('/user')
              }}>
              <i className="fa-regular fa-user" /> <div className="account-page-button">Account Page</div>
            </p>

            <p className="logout" onClick={logout}>
              <i className="fa-solid fa-arrow-right-from-bracket" />
              Log Out
            </p>
          </>
        )}
      </div>
    </div>

  )
}


export default ProfileButton;
