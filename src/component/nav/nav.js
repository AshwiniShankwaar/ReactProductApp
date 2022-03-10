import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import './nav.css';
const Nav = () => {
  const auth = localStorage.getItem("user");
  const authdata = JSON.parse(auth);
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.clear();
    navigate("/singin");
  }
  //console.log(authdata.username);
  return (
    <div className="nav">
      <ul>
        {auth?
        <>
        <li><Link to="/">product</Link></li>
        <li><Link to="/addproduct">addproduct</Link></li>
        <li><Link to="/contact">contact</Link></li>
        <li><Link to="/signin" onClick={logout}> logout</Link></li>
        <li><Link to="/profile">{authdata.username}</Link></li>
        </>
        :
        <>
        <li><Link to="/signup">sign up</Link></li>
        <li><Link to="/signin">sign in</Link></li>
        </>}
      </ul>
    </div>
  );
};
export default Nav;
