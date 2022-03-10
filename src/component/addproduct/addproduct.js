import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './addproduct.css';
const AddProduct = () => {
  const [Productname, setproductname] = useState("");
  const [ProductCompany, setproductcompany] = useState("");
  const [ProductCatagory, setproductcatagory] = useState("");
  const [ProductPrice, setprice] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const Submit = async () => {
    if (!Productname || !ProductCompany || !ProductCatagory || !ProductPrice) {
      seterror(true);
      return false;
    }
    let result = await fetch("http://localhost:4500/addproduct", {
      method: "post",
      body: JSON.stringify({
        Productname,
        ProductCompany,
        ProductCatagory,
        ProductPrice,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    // console.log(result._id);
    if (result._id) {
      //alert("account created");
      navigate("/");
    } else {
      alert(result.key);
    }
  };
  return (
    <div className="divbody">
      <p>Add Product</p>
      <form className="box">
        <input
          className="signupinput"
          type="text"
          onChange={(e) => {
            setproductname(e.target.value);
          }}
          value={Productname}
          placeholder="Enter product name"
          required
        />
        {error && !Productname && (
          <span className="invalid">Please Enter the product name</span>
        )}
        <input
          className="signupinput"
          type="text"
          onChange={(e) => {
            setproductcompany(e.target.value);
          }}
          value={ProductCompany}
          placeholder="product company"
        />
        {error && !ProductCompany && (
          <span className="invalid">provide comapny name</span>
        )}
        <input
          className="signupinput"
          type="text"
          onChange={(e) => {
            setproductcatagory(e.target.value);
          }}
          value={ProductCatagory}
          placeholder="Enter the catagory"
        />
        {error && !ProductCatagory && (
          <span className="invalid">provide catagory</span>
        )}
        <input
          className="signupinput"
          type="number"
          onChange={(e) => {
            setprice(e.target.value);
          }}
          value={ProductPrice}
          placeholder="enter price"
        />
        {error && !ProductPrice && (
          <span className="invalid">provide price for the product</span>
        )}

        <br />
        <button type="button" onClick={Submit}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddProduct;
