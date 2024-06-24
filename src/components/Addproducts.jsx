import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Marble2 from "../Images/Marble2.jpg";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import TransitionsSnackbar from "./Snackbar";
import CustomizedSnackbars from "./Snackbar";
import ModalEdit from "./Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import InputAdornment from "@mui/material/InputAdornment";
import Suggestion from "./Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import SuggestionWithAdd from "./AutocompleteWIthAdd";
import Addproductsbg from "../Images/Addproductsbg.jpg";
import { keyframes } from "@emotion/react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// const CustomTextField = styled(TextField)({
//   "& .MuiInput-input": {
//     color: "grey",
//   },
//   "&  .MuiInputBase-input": {
//     // backgroundColor: "white",
//   },

//   "& label": {
//     color: "white", // Set default text color to white
//     // backgroundColor: "white",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "white", // Set border bottom color to white
//   },
//   // "& label.Mui-focused": {
//   //   color: "black",
//   // },
//   "& .MuiInput-underline:before": {
//     borderBottomColor: "white",
//   },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "white",
//       // backgroundColor: "yellow",
//     },
// "&:hover fieldset": {
//   borderColor: "white",
//   boxShadow: "0 0 30px white",
// },
// "&.Mui-focused fieldset": {
//   borderColor: "white",
//   // backgroundColor: "white", //for background set
//   boxShadow: "0 0 30px white",
//   color: "grey",
// },
//     // "&.MuiInputLabel-outlined": {
//     //   color: "white",
//     // },
//     "&.MuiInputLabel": {
//       color: "white",
//     },
//     "& .MuiInput-input": {
//       color: "yellow",
//     },
//   },
// });
const CustomTextField = styled(TextField)({
  // "& .MuiInput-input": {
  //   color: "white",
  // },
  // "&.MuiInput-colorSecondary": {
  //   color: "white",
  // },
  "&  .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white", // Set border bottom color to white
  },
  "& label": {
    color: "white", // Set default text color to white
  },

  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      boxShadow: "0 0 30px white",
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
      boxShadow: "0 0 30px white",
    },
    // "& fieldset": {
    //   borderColor: "white",
    //   boxShadow: "0 0 30px brown",
    // },
    "&.MuiAutocomplete-inputFocused": {
      borderColor: "white",
      backgroundColor: "white", //for background set
      boxShadow: "0 0 60px white",
      color: "grey",
    },
  },
});

function Addproducts(props) {
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [getcode, setGetCode] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [length, setLength] = React.useState("");
  const [breadth, setBreadth] = React.useState("");
  const [coverage, setCoverage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [image, setImage] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [editedName, setEditedName] = React.useState();
  const [productOpen, setProductOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlecodeChange = (event) => {
    setCode(event.target.value);
  };
  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };
  const handleBreadthChange = (event) => {
    setBreadth(event.target.value);
  };
  const handleCoverageChange = (event) => {
    setCoverage(event.target.value);
  };
  const handleCategoryChange = (event, newValue) => {
    console.log("newvalue", newValue);
    setCategory(newValue || "");
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  React.useEffect(() => {
    const getProductsbycode = async () => {
      console.log("code recieved on getproduct by code", getcode);
      let response;
      try {
        if (getcode)
          response = await axios.get(
            `http://localhost:3004/getproductbycode/?productcode=${getcode}`
          );
        else {
          response = await axios.get("http://localhost:3004/getproducts");
        }

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProductsbycode();
  }, [getcode]);

  console.log("filtered data on product page ", products);

  const getProductcode = (event) => {
    console.log("event", event.target.value);
    setGetCode(event.target.value);
    console.log("code", code);
  };

  const converttobase64 = (e) => {
    console.log(e.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleAddproduct = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3004/addproduct", {
        name: name,
        productcode: code,
        length: length,
        breadth: breadth,
        coverage: coverage,
        category: category,
        description: description,
        price: price,
        unit: unit,
        base64: image,
        quantity: 1,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    // window.location.reload();
    setOpen(true);
    console.log(open);
  };

  const handleEditproduct = async (productId) => {
    console.log("edit product called");
    console.log("product id", productId);

    console.log("edited name", editedName);
    navigate(`/editproductonadd/${productId}`);

    try {
      const response = await axios.patch(
        `http://localhost:3004/editproduct/${productId}`,
        {
          name: editedName,
          productcode: code,
          length: length,
          breadth: breadth,
          coverage: coverage,
          category: category,
          description: description,
          base64: image,
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setEditedName("");
    setEdit(false);
  };

  // React.useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3004/getproducts");
  //       setProducts(response.data);
  //       console.log("retrieved products value", products);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   localStorage.getItem("cartCount");
  //   getProducts();
  // }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleOpen = () => setProductOpen(true);

  //getall categories/////

  React.useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3004/categories");
      if (response !== null) {
        setCategories(response.data);
        console.log("ALl categories ", categories);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    console.log(categoryFilteredoptions);
  };

  const categoryValue = category === null ? "" : category;
  const categoryFilteredoptions = categories === null ? categories : categories;
  return (
    <div
      //className="kenburns-top"
      style={{
        height: "100vh",
        backgroundImage: `url(${Addproductsbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // animation: `${kenburnsAnimation} 20s infinite alternate`,
        // filter: "blur(5px)",
      }}
    >
      <div
        style={{
          height: "100vh",
          overflow: "auto",
          // filter: "blur(5px)",
        }}
      >
        <Navbar />
        <br />
        <div
          style={{
            textAlign: "center",
            // display: "flex",
            justifyContent: "center",
            marginTop: "70px",

            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <h2 style={{ textAlign: "center", color: "white" }}>Add Product</h2>
          <TextField
            className="search-bar"
            onChange={getProductcode}
            id="outlined-disabled"
            sx={{
              backgroundColor: "white",
              color: "black",
              height: "30px",
              width: 300,
              marginRight: "30px",
              marginLeft: "15px",
              outline: "none",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              outline: "none",
              borderRadius: "30px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "white",
                boxShadow: "0 -20px 80px yellow",
                color: "blue",
              },
              "& label.Mui-focused": {
                backgroundColor: "blue",
                color: "white",
              },
              "&:focus": {
                backgroundColor: "blue",
                boxShadow: "0 0 10px white",
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

                // "&  .MuiInputBase-input": {
                //   color: "white",
                // },
                // "& .MuiInput-underline:after": {
                //   borderBottomColor: "white", // Set border bottom color to white
                // },
                // "& label": {
                //   color: "white", // Set default text color to white
                // },

                // "& label.Mui-focused": {
                //   color: "white",
                // },
                // "& .MuiInput-underline:before": {
                //   borderBottomColor: "white",
                // },
                // "& .MuiOutlinedInput-root": {
                //   "& fieldset": {
                //     borderColor: "transparent",
                //   },
                //   "&:hover fieldset": {
                //     borderColor: "transparent",
                //   },
                //   "&.Mui-focused fieldset": {
                //     boxShadow: "0 0 30px white",
                //     borderColor: "transparent",
                //   },
                //   "&:hover fieldset": {
                //     borderColor: "transparent",
                //     boxShadow: "0 0 30px white",
                //   },
                // "& fieldset": {
                //   borderColor: "white",
                //   boxShadow: "0 0 30px brown",
                // },
                // "&.MuiAutocomplete-inputFocused": {
                //   borderColor: "white",
                //   backgroundColor: "white", //for background set
                //   boxShadow: "0 0 60px white",
                //   color: "grey",
                // },
              },
              // "&:focus": {
              //   outline: "none",

              //   "& .MuiOutlinedInput-notchedOutline": {
              //     borderColor: "blue",
              //     outline: "none",
              //     color: "black",
              //   },
              // },
              // "& .MuiOutlinedInput-root": {
              //   "& fieldset": {
              //     borderColor: "white",
              //   },
              //   "&:hover fieldset": {
              //     borderColor: "white",
              //   },
              //   "&.Mui-focused fieldset": {
              //     boxShadow: "0 0 30px white",
              //     borderColor: "white",
              //   },
              //   "&:hover fieldset": {
              //     borderColor: "white",
              //     boxShadow: "0 0 30px white",
              //   },
              //   // "& fieldset": {
              //   //   borderColor: "white",
              //   //   boxShadow: "0 0 30px brown",
              //   // },
              //   "&.MuiAutocomplete-inputFocused": {
              //     borderColor: "white",
              //     backgroundColor: "white", //for background set
              //     boxShadow: "0 0 60px white",
              //     color: "grey",
              //   },
              // },

              // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              //   {
              //     borderColor: "", // Change the color to white when focused
              //     border: "none",
              //     color: "black",
              //   },
              // "& .MuiOutlinedInput-root": {
              //   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              //     borderColor: "white", // Change the color to white when focused
              //     border: "none",
              //     color: "black",
              //   },
              //   "&:hover .MuiOutlinedInput-notchedOutline": {
              //     border: "none",
              //     color: "black",
              //   },
              //   ".MuiOutlinedInput-notchedOutline": {
              //     border: "none",
              //     color: "black",
              //   },
              // },
            }}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "black" }} />
                </InputAdornment>
              ),
            }}
            //   value={code}
            //   onChange={getProductcode}
            placeholder="Search..."
            variant="outlined"
            type="number"
          />
        </div>

        <br />
        <div
        // style={{
        //   textAlign: "center",
        //   display: "flex",
        //   flexDirection: "row",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   width: "100%",
        //   flex: 1,
        // }}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
              },
            }}
            noValidate
            autoComplete="on"
          >
            <div
              className="text-focus-in"
              style={{
                textAlign: "center",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <CustomTextField
                onChange={handleNameChange}
                value={name}
                id="input-with-sx"
                variant="outlined"
                label="Name"
                style={{
                  minWidth: "250px",
                  width: "250px",
                  marginRight: "10px",
                }}
              />

              <CustomTextField
                onChange={handlecodeChange}
                value={code}
                id="outlined-required"
                label="Product Code"
                style={{
                  minWidth: "250px",
                  width: "250px",
                  marginRight: "10px",
                }}
              />
              <CustomTextField
                id="outlined-password-input"
                label="Length"
                type="number"
                onChange={handleLengthChange}
                value={length}
                style={{
                  minWidth: "250px",
                  width: "250px",
                  marginRight: "10px",
                }}
              />
              <CustomTextField
                id="outlined-number"
                onChange={handleBreadthChange}
                value={breadth}
                label="Breadth"
                type="number"
                style={{
                  minWidth: "250px",
                  width: "250px",
                  marginRight: "10px",
                }}
              />
              <CustomTextField
                id="outlined-search"
                onChange={handleCoverageChange}
                value={coverage}
                label="Coverage"
                type="search"
                style={{
                  minWidth: "250px",
                  width: "250px",
                  marginRight: "10px",
                }}
              />
              <CustomTextField
                id="outlined-helperText"
                label="Price"
                type="text"
                multiline
                maxRows={4}
                onChange={handlePriceChange}
                value={price}
                style={{
                  minWidth: "250px",
                  width: "250px",
                  marginRight: "10px",
                }}
              />
              <CustomTextField
                id="outlined-helperText"
                label="Unit"
                type="text"
                multiline
                maxRows={4}
                onChange={handleUnitChange}
                value={unit}
                style={{
                  minWidth: "250px",
                  width: "250px",
                  marginRight: "10px",
                }}
              />
              <CustomTextField
                id="outlined-helperText"
                label="Description"
                type="text"
                multiline
                maxRows={4}
                onChange={handleDescriptionChange}
                value={description}
                required
                style={{
                  minWidth: "250px",
                  width: "250px",
                  marginRight: "10px",
                }}
              />
              <div style={{ marginRight: "18px" }}>
                <SuggestionWithAdd
                  onChange={handleCategoryChange}
                  value={categoryValue}
                  label="Category"
                  options={categoryFilteredoptions}
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", justifyContent: "center" }}>
              <box
                style={{
                  display: "grid",
                  justifyContent: "center",
                  border: "1px solid white",
                  marginBottom: "10px",
                }}
              >
                {" "}
                {image && (
                  <img
                    style={{
                      marginTop: "5px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      boxShadow: "0 0 100px white",
                      justifySelf: "center",
                    }}
                    width={150}
                    height={150}
                    src={image}
                  />
                )}
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  onChange={converttobase64}
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    backgroundColor: "black",
                    "&:hover": {
                      bgcolor: "white",
                      color: "black",
                      // boxShadow: "0px 0px 30px white",
                    },
                  }}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </box>

              <Button
                variant="contained"
                className=" btn2"
                disabled={category === null}
                sx={{
                  width: "25ch",
                  marginTop: "10px",
                  marginBottom: "10px",
                  margin: "0 auto",
                  //display: "block",
                  bgcolor: "black",
                  backgroundColor: "black",

                  "&:hover": {
                    bgcolor: "black",
                    color: "white",
                    border: "5px outset white",
                  },
                }}
                onClick={handleAddproduct}
              >
                Add Product
              </Button>

              <CustomizedSnackbars
                open={open}
                close={handleClose}
                setOpen={setOpen}
                text="Product Added successfully"
              />
            </div>
          </Box>
        </div>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "20px",
            overflowY: "auto",
          }}
        >
          {/* <h1>Filtered Data</h1> */}
          {filteredData &&
            filteredData.map((product) => (
              <Card
                sx={{
                  maxWidth: 200,
                  minWidth: 200,
                  marginTop: 10,
                  overflowY: "auto",
                  border: "2px solid grey",
                  boxShadow: "10px 10px 5px grey",
                  marginRight: "25px",
                  marginLeft: "25px",
                  "&:hover": {
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    transform: "rotate(0deg) translateY(-15%)",
                    transition:
                      "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
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
                    Product Name:-{product.name}
                  </Typography>

                  <Typography
                    style={{ textAlign: "left" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Product Code:-{product.productcode}
                  </Typography>
                  <Typography
                    style={{ textAlign: "left" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Length:-{product.length}
                  </Typography>
                  <Typography
                    style={{ textAlign: "left" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Breadth:-{product.breadth}
                  </Typography>
                  <Typography
                    style={{ textAlign: "left" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Coverage:-{product.coverage}
                  </Typography>
                  <Typography
                    style={{ textAlign: "left" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Price:-{product.price}
                  </Typography>
                  <Typography
                    style={{ textAlign: "left" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Unit:-{product.unit}
                  </Typography>
                  <Typography
                    style={{ textAlign: "left" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Category:-{product.category}
                  </Typography>
                  <Typography
                    style={{ textAlign: "left" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Description:-{product.description}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{ padding: "20px", justifyContent: "center" }}
                >
                  <Button
                    style={{
                      size: "small",
                      fontSize: "10px",
                      backgroundColor: "black",
                      border: "none",
                      boxShadow: "10px 10px 5px grey",
                    }}
                    variant="contained"
                    endIcon={<EditIcon />}
                    onClick={() => handleEditproduct(product._id)}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            ))}
        </div>

        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {products.map((product) => (
            <Card
              sx={{
                maxWidth: 200,
                minWidth: 200,
                marginTop: 10,
                border: "2px solid grey",
                boxShadow: "10px 10px 5px grey",
                marginRight: "25px",
                marginLeft: "25px",
                "&:hover": {
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  transform: "rotate(0deg) translateY(-15%)",
                  transition:
                    "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
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
                image={product?.image}
                title={product?.name}
              />
              <CardContent>
                <Typography
                  style={{ textAlign: "left" }}
                  variant="body2"
                  color="text.secondary"
                >
                  Product Name:-{product?.name}
                </Typography>

                <Typography
                  style={{ textAlign: "left" }}
                  variant="body2"
                  color="text.secondary"
                >
                  Product Code:-{product?.productcode}
                </Typography>
                <Typography
                  style={{ textAlign: "left" }}
                  variant="body2"
                  color="text.secondary"
                >
                  Length:-{product?.length}
                </Typography>
                <Typography
                  style={{ textAlign: "left" }}
                  variant="body2"
                  color="text.secondary"
                >
                  Breadth:-{product?.breadth}
                </Typography>
                <Typography
                  style={{ textAlign: "left" }}
                  variant="body2"
                  color="text.secondary"
                >
                  Coverage:-{product?.coverage}
                </Typography>
                <Typography
                  style={{ textAlign: "left" }}
                  variant="body2"
                  color="text.secondary"
                >
                  Price:-{product?.price}
                </Typography>
                <Typography
                  style={{ textAlign: "left" }}
                  variant="body2"
                  color="text.secondary"
                >
                  Unit:-{product?.unit}
                </Typography>
                <Typography
                  style={{ textAlign: "left" }}
                  variant="body2"
                  color="text.secondary"
                >
                  Category:-{product?.category}
                </Typography>
                <Typography
                  style={{ textAlign: "left" }}
                  variant="body2"
                  color="text.secondary"
                >
                  Description:-{product?.description}
                </Typography>
              </CardContent>
              <CardActions
                style={{ padding: "20px", justifyContent: "center" }}
              >
                <Button
                  style={{
                    size: "small",
                    fontSize: "10px",
                    backgroundColor: "black",
                    border: "none",
                    boxShadow: "10px 10px 5px grey",
                  }}
                  variant="contained"
                  endIcon={<EditIcon />}
                  onClick={() => handleEditproduct(product._id)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Addproducts;
