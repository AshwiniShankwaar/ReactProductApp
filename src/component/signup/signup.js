import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
const Signup = () => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpasssword] = useState("");
  const [repassword, setrepasssword] = useState("");
  const [age, setage] = useState(false);
  const [ready, setready] = useState(false);
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
  let result;
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const Submit = async () => {
    /*console.log(email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ) );*/
    //console.log(password.length > 10);
    if (
      !email ||
      !username ||
      !password ||
      !repassword ||
      age === false ||
      ready === false
    ) {
      seterror(true);
      return false;
    }
    let checkemail = email.match(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );
    if (checkemail) {
      if (repassword === password) {
        if (password.length > 10) {
          result = await fetch("http://localhost:4500/register", {
            method: "post",
            body: JSON.stringify({ email, username, password, age, ready }),
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
          alert("password should be more then 10 character");
        }
      } else {
        alert("Password and Re Enter password doesn't matched");
      }
    } else {
      alert("provided email is not a vaild one");
    }
  };
  return (
    <div>
      <h1>Register</h1>
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
          type="text"
          onChange={(e) => {
            setusername(e.target.value);
          }}
          value={username}
          placeholder="uesrname"
        />
        {error && !username && (
          <span className="invalid">provide username</span>
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
        <input
          className="signupinput"
          type="password"
          onChange={(e) => {
            setrepasssword(e.target.value);
          }}
          value={repassword}
          placeholder="Re-enter password"
        />
        {error && !repassword && (
          <span className="invalid">provide Re-enter password</span>
        )}
        <br />
        <input
          type="radio"
          value={age}
          onChange={(e) => {
            setage(!age);
          }}
        />
        <label>Are you 18 plus.</label>
        <br />
        {error && age === false && (
          <span className="invalid">18 plus is require</span>
        )}
        <br />
        <input
          type="checkbox"
          value={ready}
          onChange={(e) => {
            setready(!ready);
          }}
        />
        <label>Are you ready.</label>
        <br />
        {error && ready === false && <span className="invalid">error</span>}
        <br />
        <br />
        <br />
        <button type="button" onClick={Submit}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Signup;
