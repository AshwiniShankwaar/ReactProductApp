import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
const UpdateProduct = () => {
  const [Productname, setproductname] = useState("");
  const [ProductCompany, setproductcompany] = useState("");
  const [ProductCatagory, setproductcatagory] = useState("");
  const [ProductPrice, setprice] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(()=>{
    getdata();
  },[]);
  const getdata = async() =>{
    let Result = await fetch(`http://localhost:4500/getproductData/${params._id}`);
    Result = await Result.json();
    //setdata(Result);
    setproductname(Result[0].Productname);
    setproductcatagory(Result[0].ProductCatagory);
    setproductcompany(Result[0].ProductCompany);
    setprice(Result[0].ProductPrice);
    
  }
  const Submit = async() =>{
    if (!Productname || !ProductCompany || !ProductCatagory || !ProductPrice) {
      seterror(true);
      return false;
    }
    //console.log(`http://localhost:4500/updateproduct/${params._id}`);
    let result = await fetch(`http://localhost:4500/updateproduct/${params._id}`, {
      method: "Put",
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
    if(result.key){
      alert(result.key);
      navigate("/");
    } else {
      alert(result.key);
    }
  }

  return (
    <div>
      <p>update Product</p>
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
export default UpdateProduct;
