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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SuggestionWithAdd from "./AutocompleteWIthAdd";
import { useNavigate, useParams } from "react-router-dom";
import Addproductsbg from "../Images/Addproductsbg.jpg";
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

function Editproductonadd() {
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [length, setLength] = React.useState("");
  const [breadth, setBreadth] = React.useState("");
  const [coverage, setCoverage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [price, setPrice] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState();
  const [open, setOpen] = React.useState(false);
  const { productId } = useParams();
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
    setCategory(newValue);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  React.useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3004/categories");
        setCategories(response.data);
        console.log("Retrieved all categories", categories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getCategories();
  }, []);

  React.useEffect(() => {
    const productdata = async () => {
      try {
        console.log("productId", productId);
        const response = await axios.get(
          `http://localhost:3004/editproductonadd/${productId}`
        );
        setProducts(response.data);
        console.log(response.data);
        console.log("retrieved products value", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    productdata();
  }, [productId]);

  console.log("Product data by id", products);

  React.useEffect(() => {
    setName(products?.name);
    setCode(products?.productcode);
    setLength(products?.length);
    setBreadth(products?.breadth);
    setCoverage(products?.coverage);
    setCategory(products?.category);
    setPrice(products?.price);
    setUnit(products?.unit);
    setDescription(products?.description);
    setImage(products?.image);
  }, [products]);

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

  const handleEditproduct = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3004/editproductonadd/${productId}`,
        {
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
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    console.log("first name adter edit", name);
    // window.location.reload();
    setOpen(true);
    console.log(open);
    navigate("/addproducts");
    console.log("image after edit", image);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${Addproductsbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // animation: `${kenburnsAnimation} 20s infinite alternate`,
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
        <h2
          sx={{
            marginTop: "50px",
            textAlign: "center",
            color: "black",
            transition: "background-color 0.3s, box-shadow 0.3s, color 0.3s",
            ":hover": {
              backgroundColor: "white",
              boxShadow: "0 -20px 80px yellow",
              color: "blue",
            },
          }}
        >
          Edit Product
        </h2>
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <Box
          // component="form"

          sx={{
            "& .MuiTextField-root": {
              m: 1,
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div
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
              id="outlined-disabled"
              label="Name"
              style={{ minWidth: "250px", width: "250px", marginRight: "10px" }}
            />
            <CustomTextField
              onChange={handlecodeChange}
              value={code}
              id="outlined-required"
              label="Product Code"
              style={{ minWidth: "250px", width: "250px", marginRight: "10px" }}
            />

            <CustomTextField
              id="outlined-password-input"
              label="Length"
              type="number"
              onChange={handleLengthChange}
              value={length}
              style={{ minWidth: "250px", width: "250px", marginRight: "10px" }}
            />

            <CustomTextField
              id="outlined-number"
              onChange={handleBreadthChange}
              value={breadth}
              label="Breadth"
              type="number"
              style={{ minWidth: "250px", width: "250px", marginRight: "10px" }}
            />
            <CustomTextField
              id="outlined-search"
              onChange={handleCoverageChange}
              value={coverage}
              label="Coverage"
              type="search"
              style={{ minWidth: "250px", width: "250px", marginRight: "10px" }}
            />

            {/* <TextField
              id="outlined-search"
              onChange={handleCategoryChange}
              value={category}
              label="Category"
              type="Price"
            /> */}
            <CustomTextField
              id="outlined-search"
              onChange={handlePriceChange}
              value={price}
              label="Price"
              type="Price"
              style={{ minWidth: "250px", width: "250px", marginRight: "10px" }}
            />
            <CustomTextField
              id="outlined-search"
              onChange={handleUnitChange}
              value={unit}
              label="Unit"
              type="Price"
              style={{ minWidth: "250px", width: "250px", marginRight: "10px" }}
            />

            <CustomTextField
              id="outlined-helperText"
              label="Description"
              type="text"
              multiline
              maxRows={4}
              onChange={handleDescriptionChange}
              value={description}
              style={{ minWidth: "250px", width: "250px", marginRight: "10px" }}
            />
            <div style={{ width: "200px" }}>
              {" "}
              <SuggestionWithAdd
                onChange={handleCategoryChange}
                value={category}
                label="Category"
                options={categories}
              />
            </div>
          </div>

          <div style={{ display: "grid", justifyContent: "center" }}>
            <box
              style={{
                display: "grid",
                justifyContent: "center",
                border: "1px solid white",
                borderRadius: "50px",
                marginTop: "10px",

                marginBottom: "10px",
              }}
            >
              {" "}
              {image && (
                <img
                  style={{
                    marginTop: "5px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    boxShadow: "0 0 50px white",
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
                  borderRadius: "20px",
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
              sx={{
                width: "250px",
                marginTop: "10px",
                marginBottom: "10px",
                borderRadius: "20px",
                margin: "0 auto",
                //display: "block",
                bgcolor: "black",
                boxShadow: "10px 10px 5px  grey",
                backgroundColor: "black",
                "&:hover": {
                  bgcolor: "black",
                  color: "white",
                  border: "5px outset white",
                },
              }}
              onClick={handleEditproduct}

              // endIcon={<LocalHospitalIcon />}
              // disabled={!name || !specialist}
              //   onClick={async () => {
              //     await handleAdddoctors();
              //     await handleshowDoctors();
              //   }}
              // onClick={handleAdddoctors}
            >
              Edit Product Details
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
    </div>
  );
}
export default Editproductonadd;
