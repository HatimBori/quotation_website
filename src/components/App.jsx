import React from "react";
import SignIn from "./Login";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Addtocart from "./Addtocart";
import Addproducts from "./Addproducts";
import Addcustomer from "./Addcustomer";
import ProductsCard from "./Products";
import Home from "./Home";
import Editcustomer from "./Editcustomer";
import Editproduct from "./Editproduct";
import Editproductonadd from "./Editproductonadd";
import Getquotation from "./Getquotation";

function App() {
  const [isAuthenticate, setIsAuthenticate] = React.useState(false);

  // useEffect(() => {
  //   const getRole = async () => {
  //     try {
  //       const response = localStorage.getItem("");
  //       setRole(response);
  //       console.log("retrieved role value", role);
  //     } catch (error) {
  //       console.error("Error fetching role:", error);
  //     }
  //   };

  //   getRole();
  // }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticate ? <Navbar /> : <SignIn />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/products" element={<ProductsCard />}>
          <Route index element={<ProductsCard />} />
        </Route>

        <Route exact path="/addproducts" element={<Addproducts />} />
        <Route exact path="/addcustomer" element={<Addcustomer />} />
        <Route
          exact
          path="/editcustomer/:customerId"
          element={<Editcustomer />}
        />
        <Route exact path="/editproduct/:productId" element={<Editproduct />} />
        <Route
          exact
          path="/editproductonadd/:productId"
          element={<Editproductonadd />}
        />
        
        <Route exact path="/cart" element={<Addtocart />} />
        <Route exact path="/getquotation/:customerId" element={<Getquotation />} />
      </Routes>
    </Router>
  );
}

export default App;
