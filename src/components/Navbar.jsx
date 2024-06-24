import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Hoverbutton from "./Hoverbutton";
import Logo from "../Images/Logo1.jpg";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Suggestion from "./Autocomplete";
import axios from "axios";

function Navbar(props) {
  const location = useLocation();
  const [isHovered, setIsHovered] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState();
  const [categories, setCategories] = React.useState([]);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    console.log(event.target.value);
    const term = event.target.value;
    console.log("term", term);
    setSearchTerm(term);

    const results = props.products.filter(
      (product) => product.productcode && product.productcode?.includes(term)
    );
    setSearchResults(results);
    navigate(`?productcode=${term}`);
  };

  console.log("filtered data", searchResults);
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    color: isHovered ? "yellow" : "white",
  };

  // React.useEffect(() => {
  //   const getCartCount = localStorage.getItem("cartCount");
  //   if (getCartCount) {
  //     setCartCount(getCartCount);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   getCategories();
  // }, []);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3004/addtocart");
        setCartCount(response.data.length);

        console.log("original retrieved products value", cartCount);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3004/categories");
      setCategories(response.data);
      console.log("retrieved products value", categories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  console.log("categories", categories);
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          backgroundColor: "",
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
        }}
      >
        <div>
          <AppBar
            position="fixed"
            sx={{
              backgroundColor: "transparent",
              justifyContent: "centre",
              boxShadow: "none",
              border: "none",
              marginBottom: 5,
              display: "flex",
              height: "60px",
            }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <img
                  src={Logo}
                  alt="Logo"
                  style={{ height: "60px", textAlign: "" }}
                />
              </Typography>

              {location.pathname === "/addproducts" ? ( // Check if the current route is add-product
                <div style={{ display: "flex" }}>
                  {" "}
                  <Hoverbutton component={Link} to="/home" text="Home" />
                  <Hoverbutton
                    component={Link}
                    to="/addcustomer"
                    text="Add Customer"
                  />
                  <Hoverbutton
                    to="/cart"
                    text={
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <ShoppingCartCheckoutIcon />

                        {cartCount > 0 && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-6px",
                              right: "-10px",
                              fontSize: "11px",
                              backgroundColor: "white",
                              color: "black",
                              borderRadius: "70%",
                              width: "15px",
                              height: "15px",
                              textAlign: "center",
                              lineHeight: "15px",
                            }}
                          >
                            {cartCount}
                          </div>
                        )}
                      </div>
                    }
                  ></Hoverbutton>
                </div>
              ) : (
                <div></div>
              )}
              {location.pathname === "/addcustomer" ? (
                <div style={{ display: "flex" }}>
                  {" "}
                  <Hoverbutton component={Link} to="/home" text="Home" />
                  <Hoverbutton
                    component={Link}
                    to="/addproducts"
                    text="Add Product"
                  />
                  <Hoverbutton
                    to="/cart"
                    text={
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <ShoppingCartCheckoutIcon />
                        {cartCount > 0 && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-6px",
                              right: "-10px",
                              fontSize: "11px",
                              backgroundColor: "white",
                              color: "black",
                              borderRadius: "70%",
                              width: "15px",
                              height: "15px",
                              textAlign: "center",
                              lineHeight: "15px",
                            }}
                          >
                            {cartCount}
                          </div>
                        )}
                      </div>
                    }
                  ></Hoverbutton>
                </div>
              ) : (
                <div></div>
              )}
              {location.pathname === "/products" ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <Hoverbutton
                    component={Link}
                    to="/addproducts"
                    text="Add product"
                  />
                  <Hoverbutton to="/addcustomer" text="Add Customer" />
                  <Hoverbutton
                    to="/cart"
                    text={
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <ShoppingCartCheckoutIcon />
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-10px",
                            fontSize: "11px",
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "70%",
                            width: "15px",
                            height: "15px",
                            textAlign: "center",
                            lineHeight: "15px",
                          }}
                        >
                          {props.cartCount}
                        </div>
                      </div>
                    }
                  ></Hoverbutton>
                </div>
              ) : (
                <div></div>
              )}
              {location.pathname === "/cart" ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <Hoverbutton component={Link} to="/home" text="Home" />
                </div>
              ) : (
                <div></div>
              )}
              {location.pathname === "/home" ? (
                <div style={{ display: "flex" }}>
                  {" "}
                  <Hoverbutton
                    component={Link}
                    to="/addproducts"
                    text="Add product"
                  />
                  <Hoverbutton to="/addcustomer" text="Add Customer" />
                </div>
              ) : (
                <div></div>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </Box>
    </div>
  );
}

export default Navbar;
