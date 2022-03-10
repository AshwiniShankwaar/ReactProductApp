import React, { useEffect, useState } from "react";
import "./product.css";
import { useNavigate } from "react-router-dom";
const Getproduct = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    let Result = await fetch("http://localhost:4500/getproducts");
    Result = await Result.json();
    setdata(Result);
    //console.log(Result);
  };
  //console.log(data);
  const UpdateProduct = (props) =>{
    //console.log(props);
    navigate(`/updateproduct/${props}`);
  }
  const DeleteProduct =async(props) =>{

    //console.log(props);
    let Result = await fetch(`http://localhost:4500/deleteproduct/${props}`,{method: "Delete"});
    Result = await Result.json();
    alert(Result.key);
    getdata();
  }
  //console.log(data);
  return (
    <div className="product">
      <h1>Product list</h1>
      {data.map((data,index) => (
        <div className="product-list" key={data._id}>
          <p>Name of the product: {data.Productname}</p>
          <p>company: {data.ProductCompany}</p>
          <p>catagory: {data.ProductCatagory}</p>
          <p>price: ${data.ProductPrice}</p>
          <button type="submit" onClick={()=>UpdateProduct(data._id)}>Update</button>
          <button type="submit" onClick={()=>DeleteProduct(data._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
export default Getproduct;
