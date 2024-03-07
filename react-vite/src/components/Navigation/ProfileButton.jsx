import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";

import './Navigation.css'

function ProfileButton({user}) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); 
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

  return (
    <div className="logged-out-buttons" onClick={logout}>
            
            <i className="fa-solid fa-arrow-right-from-bracket"/>
              Sign Out
           
      </div>
   
  )
}
     

export default ProfileButton;
