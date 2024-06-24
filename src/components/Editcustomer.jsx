import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Navbar from "./Navbar";
import { Block } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Snackbar from "@mui/material/Snackbar";
import CustomizedSnackbars from "./Snackbar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import addinfo from "../Images/Addinformation.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Addcustomerbg from "../Images/customer.jpg";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CustomTextField = styled(TextField)({
  "& .MuiInput-input": {
    color: "white",
  },
  "&  .MuiInputBase-input": {},

  "& label": {
    color: "white", // Set default text color to white
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white", // Set border bottom color to white
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
      backgroundColor: "yellow",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

function Editcustomer() {
  const defaultTheme = createTheme();
  const [fname, setfName] = React.useState("");
  const [lname, setlName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { customerId } = useParams();
  const [customerData, setCustomerData] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCustomerData = async () => {
      console.log(customerId);
      try {
        const response = await axios.get(
          `http://localhost:3004/editcustomer/${customerId}`
        );
        setCustomerData(response.data);
        console.log("retrieved customer value", response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  React.useEffect(() => {
    if (customerData) {
      setfName(customerData.fname);
      setlName(customerData.lname);
      setEmail(customerData.email);
      setContact(customerData.contact);
      setAddress(customerData.address);
    }
  }, [customerData]);
  console.log(fname);
  //   React.useEffect(() => {
  //     if (customerData) {
  //       setfName(customerData.firstName);
  //       setlName(customerData.lastName);
  //     }
  //   }, [customerData]);

  const handlefNameChange = (event) => {
    setfName(event.target.value);
  };
  const handlelNameChange = (event) => {
    setlName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleEditcustomer = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3004/editcustomer/${customerId}`,
        {
          fname: fname,
          lname: lname,
          email: email,
          contact: contact,
          address: address,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setOpen(true);
    navigate("/cart");
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
        backgroundImage: `url(${Addcustomerbg})`,
        backgroundSize: "cover",
        backgroundColor: "rgba(255, 255, 255, 2.9)",
        backgroundPosition: "center",
        // filter: "blur(5px)",
      }}
    >
      <Navbar />
      <br />
      <div style={{}}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "35ch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            },
          }}
          noValidate
          autoComplete="off"
        >
          {/* <Box
      height={200}
      width={200}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    ></Box> */}

          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 17,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#101720",
                }}
              >
                {" "}
                <div
                  style={{
                    backgroundColor: "#F0F8FF",
                    color: "black",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Avatar sx={{ m: 1, bgcolor: "black" }}>
                    <AddBoxIcon />
                  </Avatar> */}
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{
                      fontSize: "40px",
                      padding: "10px",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    Customer Details
                  </Typography>
                </div>
                {/* <Avatar sx={{ m: 1, bgcolor: "#1976D2" }}>
                  <AddBoxIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Customer Details Here...
                </Typography> */}
                <Box
                  component="form"
                  onSubmit={handleEditcustomer}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PersonIcon
                      sx={{
                        color: "action.active",
                        mr: 1,
                        my: 0.5,
                        color: "white",
                      }}
                    />
                    <CustomTextField
                      id="input-with-sx"
                      label="First Name"
                      type="text"
                      onChange={handlefNameChange}
                      value={fname}
                      variant="standard"
                    />
                  </Box>
                  {/* <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    type="text"
                    onChange={handlefNameChange}
                    // onChange={(e) => setfName(e.target.value)}
                    value={fname}
                  /> */}

                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PersonIcon
                      sx={{
                        color: "action.active",
                        mr: 1,
                        my: 0.5,
                        color: "white",
                      }}
                    />
                    <CustomTextField
                      id="input-with-sx"
                      label="Last Name"
                      type="text"
                      onChange={handlelNameChange}
                      value={lname}
                      variant="standard"
                    />
                  </Box>

                  {/* <TextField
                    id="outlined-disabled"
                    label="Last Name"
                    type="text"
                    onChange={handlelNameChange}
                    value={lname}
                  /> */}

                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <EmailIcon
                      sx={{
                        color: "action.active",
                        mr: 1,
                        my: 0.5,
                        color: "white",
                      }}
                    />
                    <CustomTextField
                      id="input-with-sx"
                      label="Email"
                      type="email"
                      onChange={handleEmailChange}
                      value={email}
                      variant="standard"
                    />
                  </Box>
                  {/* <TextField
                    id="outlined-password-input"
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    onChange={handleEmailChange}
                    value={email}
                  /> */}

                  {/* <TextField
                    id="outlined-read-only-input"
                    label="Phone No."
                    type="tel"
                    onChange={handleContactChange}
                    value={contact}
                  /> */}
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <ContactPhoneIcon
                      sx={{
                        color: "action.active",
                        mr: 1,
                        my: 0.5,
                        color: "white",
                      }}
                    />
                    <CustomTextField
                      id="input-with-sx"
                      label="Phone No."
                      type="tel"
                      onChange={handleContactChange}
                      value={contact}
                      variant="standard"
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <LocationOnIcon
                      sx={{
                        color: "action.active",
                        mr: 1,
                        my: 0.5,
                        color: "white",
                      }}
                    />
                    <CustomTextField
                      id="input-with-sx"
                      label="Adress"
                      type="text"
                      multiline
                      maxRows={4}
                      onChange={handleAddressChange}
                      value={address}
                      variant="standard"
                    />
                  </Box>
                  {/* <TextField
                    id="outlined-number"
                    label="Adress"
                    type="text"
                    multiline
                    maxRows={4}
                    onChange={handleAddressChange}
                    value={address}
                  /> */}
                  {/* <input
                    type="text"
                    value={customerData?.firstName || ""}
                    onChange={handlefNameChange}
                  /> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        backgroundColor: "#F0F8FF",
                        color: "black",
                        width: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        "&:hover": {
                          backgroundColor: "#F0F8FF",
                          color: "#101720",
                        },
                      }}
                      onClick={handleEditcustomer}
                    >
                      Edit Customer
                    </Button>
                  </div>
                </Box>
              </Box>

              <CustomizedSnackbars
                open={open}
                close={handleClose}
                setOpen={setOpen}
                text="Customer Details Added successfully"
              />
              {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
          </ThemeProvider>
        </Box>
      </div>
    </div>
  );
}

export default Editcustomer;
