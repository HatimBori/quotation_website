import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Marble2 from "../Images/Marble2.jpg";
import axios from "axios";
import Productbg from "../Images/PBG3.jpg";
import SearchProductbg from "../Images/SearchProduct.jpg";
import SearchProductbg2 from "../Images/SPBG3.jpg";
import Addproducts from "./Addproducts";
import { useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import Suggestion from "./Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

export default function ProductsCard({ product }) {
  const [products, setProducts] = React.useState([]);
  const [isAdded, setIsAdded] = React.useState(false);
  const [editable, setEditable] = React.useState(true);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [addedProducts, setAddedProducts] = React.useState({});
  const [cartCount, setCartCount] = React.useState(0);
  const [filteredData, setFilteredData] = React.useState([]);
  const [code, setCode] = React.useState("");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const [categorychange, setCategorychange] = React.useState();

  React.useEffect(() => {
    const getCartCount = localStorage.getItem("cartCount");
    if (getCartCount) {
      setCartCount(parseInt(getCartCount));
    }
  }, [cartCount]);

  React.useEffect(() => {
    // Get the filtered data from URL parameter
    const filteredDataFromURL = searchParams.get("productcode");

    // Update state with data from URL parameter
    if (filteredDataFromURL) {
      setCode(filteredDataFromURL);
    }
  }, [searchParams]);

  console.log("filtered data on product page", code);

  React.useEffect(() => {
    // const timerId = setTimeout(() => {
    const getProductsbycode = async () => {
      console.log("code", code);
      try {
        let response;
        if (code) {
          response = await axios.get(
            `http://localhost:3004/getproductbycode/?productcode=${code}`
          );
        }
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProductsbycode();
    // }, 1000);

    // return () => clearTimeout(timerId);
  }, [code]);

  console.log("filtered data on product page 66 code ", filteredData);

  const getProductcode = (event) => {
    const newcode = parseInt(event.target.value);
    setCode(newcode);
    console.log("code", code);
  };

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3004/getproducts");
        setProducts(response.data);
        setLoading(false);
        console.log("original retrieved products value", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const handleAddToCart = async (product) => {
    console.log(product);
    const response = await axios.post("http://localhost:3004/addtocart", {
      product_id: product._id,
      name: product.name,
      productcode: product.productcode,
      length: product.length,
      breadth: product.breadth,
      coverage: product.coverage,
      unit: product.unit,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    });
    setAddedProducts((prevState) => ({
      ...prevState,
      [product._id]: true,
    }));
    console.log("product added", product);
    setIsAdded(true);
    setEditable(false);
    setCartCount((prevCount) => prevCount + 1);
    localStorage.setItem("cartCount", cartCount + 1);
  };
  React.useEffect(() => {
    getCategories();
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
  const handleCategoryChange = (event, newValue) => {
    setCategorychange(newValue);
  };

  React.useEffect(() => {
    const getproductbycategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/getproductbycategory/?category=${categorychange}`
        );
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getproductbycategory();
  }, [categorychange]);

  console.log("categorychange", categorychange);
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
  }, [handleAddToCart]);
  return (
    <div>
      <Navbar
        cartCount={cartCount}
        setCartCount={setCartCount}
        products={products}
      />
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundImage: `url(${SearchProductbg2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            marginTop: "65px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            // backgroundColor: "grey",
            // border: "5px solid #66afe9",
            // filter: "blur(5px)",
            borderRadius: "30px",
            paddingRight: "20px",
          }}
        >
          {/* <h2
            style={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "30px",
              padding: "10px",
              fontSize: "20px",
              marginTop: "10px",
              width: "200px",
            }}
          >
            Products
          </h2> */}
          <TextField
            sx={{
              backgroundColor: "white",

              //  backgroundColor: "white",
              color: "white",
              height: "40px",
              width: 1000,
              marginLeft: "15px",
              outline: "none",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              outline: "none",
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "0 0 10px white",
                color: "blue",
              },
              "& label.Mui-focused": {
                backgroundColor: "blue",
                color: "white",
              },
              "&:focus": {
                backgroundColor: "blue",
              },

              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white", // Change the color to white when focused
                  border: "none",
                  color: "black",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& label.Mui-focused": {
                  color: "white",
                },
              },
            }}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={code}
            onChange={getProductcode}
            placeholder="Search Products By Code..."
            variant="outlined"
            type="number"
          />
          <Suggestion
            onChange={handleCategoryChange}
            value={categorychange}
            label="Category"
            options={categories}
          />
        </Box>

        {/* {isLoading ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </div>
        ) : null} */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "100px",
          }}
        >
          {Array.isArray(filteredData) &&
            filteredData.map((product) => (
              <Card
                sx={{
                  maxWidth: 200,
                  minWidth: 200,
                  marginTop: 15,
                  marginBottom: 10,
                  minHeight: 320,
                  maxHeight: 320,
                  boxShadow: "10px 10px 5px grey",
                  marginRight: "25px",
                  marginLeft: "25px",
                  "&:hover": {
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.25)",
                    transition: "all 0.6s ease-in-out",
                  },
                }}
              >
                <CardMedia
                  sx={{
                    height: 140,
                    margin: "10px",
                    borderRadius: "10px",
                    overflowY: "auto",
                  }}
                  image={product.image}
                  title={product.name}
                />
                <CardContent>
                  <Typography
                    style={{ textAlign: "left" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Code:-{product.productcode}
                  </Typography>
                  <Typography
                    style={{ textAlign: "left" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Name:-{product.name}
                  </Typography>
                  <Typography
                    style={{ textAlign: "left" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Category:-{product.category}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{ padding: "20px", justifyContent: "center" }}
                >
                  {addedProducts[product._id] ? (
                    <Button
                      style={{
                        size: "small",
                        fontSize: "10px",
                        backgroundColor: "white",
                        color: "black",
                        border: "none",
                        boxShadow: "10px 10px 5px grey",
                      }}
                      disabled={!editable || isAdded}
                      variant="contained"
                      endIcon={<AddShoppingCartIcon />}
                    >
                      Added To Cart
                    </Button>
                  ) : (
                    <Button
                      style={{
                        size: "small",
                        fontSize: "10px",
                        backgroundColor: "black",
                        border: "none",
                        boxShadow: "10px 10px 5px grey",
                        marginBottom: "10px",
                      }}
                      variant="contained"
                      endIcon={<AddShoppingCartIcon />}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add
                    </Button>
                  )}
                </CardActions>
              </Card>
            ))}
        </div>
        {!loading && (
          <>
            {/* <h1
              style={{
                marginBottom: "20px",
                backgroundColor: "white",
                height: "70px",
                width: "90%",
                position: "relative",
                // borderRadius: "30px",
                fontSize: "40px",
                border: "10px inset grey",
                borderColor: "grey",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              All Products
            </h1> */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                overflowY: "auto",
                marginBottom: "20px",
              }}
            >
              {Array.isArray(products) &&
                products.map((product) => (
                  <Card
                    sx={{
                      maxWidth: 200,
                      minWidth: 200,
                      marginBottom: 6,
                      marginTop: 6,
                      minHeight: 300,
                      maxHeight: 300,
                      boxShadow: "10px 10px 5px grey",
                      marginRight: "25px",
                      marginLeft: "25px",
                      "&:hover": {
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                        transform: "scale(1.25)",
                        transition: "all 0.6s ease-in-out",
                      },
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: 140,
                        margin: "10px",
                        borderRadius: "10px",
                        // overflowY: "auto",
                      }}
                      image={product.image}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography
                        style={{ textAlign: "left" }}
                        variant="body2"
                        color="text.secondary"
                      >
                        Code:-{product.productcode}
                      </Typography>
                      <Typography
                        style={{ textAlign: "left" }}
                        variant="body2"
                        color="text.secondary"
                      >
                        Name:-{product.name}
                      </Typography>
                    </CardContent>
                    <CardActions
                      style={{ padding: "20px", justifyContent: "center" }}
                    >
                      {addedProducts[product._id] ? (
                        <Button
                          style={{
                            size: "small",
                            fontSize: "10px",
                            backgroundColor: "white",
                            color: "black",
                            border: "none",
                            boxShadow: "10px 10px 5px grey",
                            borderRadius: "20px",
                          }}
                          disabled={!editable || isAdded}
                          variant="contained"
                          endIcon={<AddShoppingCartIcon />}
                        >
                          Added To Cart
                        </Button>
                      ) : (
                        <Button
                          style={{
                            size: "small",
                            fontSize: "10px",
                            backgroundColor: "black",
                            border: "none",
                            boxShadow: "10px 10px 5px grey",
                            borderRadius: "20px",
                            width: "150px",
                          }}
                          variant="contained"
                          endIcon={<AddShoppingCartIcon />}
                          onClick={() => handleAddToCart(product)}
                        >
                          Add
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                ))}
              <h1
                style={{
                  marginTop: "100px",
                  marginBottom: "20px",
                  backgroundColor: "white",
                  height: "70px",
                  width: "90%",
                  position: "relative",
                  borderRadius: "10px",
                  fontSize: "40px",
                  border: "10px inset grey",
                  borderColor: "grey",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                All Products
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
