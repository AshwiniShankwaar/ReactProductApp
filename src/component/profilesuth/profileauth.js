import React from "react";
import { useNavigate } from "react-router-dom";
const Profileauth = () => {
  const navigate = useNavigate();
  let result = JSON.parse(localStorage.getItem("user"));
  //console.log(result.username);
  const DeleteAccount = async () => {
    result = await fetch("http://localhost:4500/deleteAccount/" + result._id, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    if(result){
      localStorage.clear();
      navigate('/signup')
    }
  };
  return (
    <div>
      <p>Hello {result.username}</p>
      <p>Your email id is {result.email}</p>
      <button type="submit" onClick={DeleteAccount}>
        Delete Account
      </button>
    </div>
  );
};
export default Profileauth;
