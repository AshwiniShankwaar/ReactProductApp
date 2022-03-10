import "./App.css";
import Nav from "./component/nav/nav";
import Footer from "./component/footer/footer"
import Signup from "./component/signup/signup"
import { BrowserRouter ,Route,Routes} from "react-router-dom";//import name should be in capital
import PrivateComponent from "./component/PrivateComponent";
import Signin from "./component/signin/signin";
import Getproduct from "./component/product/product";
import AddProduct from "./component/addproduct/addproduct";
import Profileauth from "./component/profilesuth/profileauth";
import UpdateProduct from "./component/updateproduct/updateproduct";
//route path should be same as the link to path
function App() {
  //let Auth = localStorage.getItem('user');
  //console.log(PrivateComponent)
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}>
          <Route path="/" element={<Getproduct/>}></Route>
          <Route path="/addproduct" element={<AddProduct/>}></Route>
          <Route path="/contact" element={<h1>contact component</h1>}></Route>
          <Route path="/updateproduct/:_id" element={<UpdateProduct/>}></Route>
          <Route path="/profile" element={<Profileauth/>}></Route>
          </Route>
          
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
