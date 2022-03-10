import React from "react";
import "./signin.css";
import "../signup/signup.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpasssword] = useState("");
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
  let result;
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const Submit = async() => {
    if (!email || !password) {
      seterror(true);
      return false;
    }
    let checkemail = email.match(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );
    if (checkemail) {
      result = await fetch("http://localhost:4500/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
      });
      result = await result.json();
      // console.log(result._id);
      if (result._id) {
        localStorage.setItem("user", JSON.stringify(result));
        //alert("account created");
        navigate("/");
      } else {
        alert(result.key);
      }
    } else {
      alert("provided email is not a vaild one");
    }
  };
  return (
    <div>
      <h1>Login to your Account</h1>
      <form className="box">
        <input
          className="signupinput"
          type="text"
          onChange={(e) => {
            setemail(e.target.value);
          }}
          value={email}
          placeholder="Example@gmail.com"
          required
        />
        {error && !email && (
          <span className="invalid">Please Enter the email id</span>
        )}

        <input
          className="signupinput"
          type="password"
          onChange={(e) => {
            setpasssword(e.target.value);
          }}
          value={password}
          placeholder="Enter the password"
        />
        {error && !password && (
          <span className="invalid">provide password</span>
        )}

        <br />
        <br />
        <button type="button" onClick={Submit}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Signin;
