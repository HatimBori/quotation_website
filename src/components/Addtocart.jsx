import Navbar from "./Navbar";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import addinfo from "../Images/Addinformation.png";
import ProductsCard from "./Products";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import CustomTable from "./Table";
import ColorCheckbox from "./Color Checkbox";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Addtocartbg from "../Images/addtocart.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,

  bgcolor: "#1F2937",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Addtocart() {
  const [customers, setCustomers] = React.useState([]);
  const [getcarts, setgetCarts] = React.useState([]);
  const [fname, setfname] = React.useState("");
  const [lname, setlname] = React.useState("");
  const [selectedCellData, setSelectedCellData] = React.useState(null);
  const [rowws, setRowws] = React.useState([]);
  const [rows1, setRows1] = React.useState([]);
  const [cartCount, setCartCount] = React.useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log("Selected Cell Data", selectedCellData);

  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete("http://localhost:3004/deleteall");
      console.log("delete all clicked");
    } catch (error) {
      console.error("Error deleting all rows:", error);
    }
  };

  const handlecustomerDelete = (customerid) => {
    console.log("customerid", customerid);
    try {
      console.log(customerid);
      const response = axios.delete(
        `http://localhost:3004/deletecustomer/${customerid}`
      );
      console.log(response);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
    window.location.reload();
  };

  const handleCustomerAddtoquotation = async (selectedCellData) => {
    console.log("Selected Cell Data with customer id ", selectedCellData);
    navigate(`/getquotation/${selectedCellData.customerid}`);
  };

  const handlecustomerEdit = async (selectedCellData) => {
    console.log("Selected Cell Data with customer id ", selectedCellData);
    navigate(`/editcustomer/${selectedCellData.customerid}`);
  };

  const handleProductEdit = async (selectedCellData) => {
    console.log("Selected Cell Data with product id ", selectedCellData);
    navigate(`/editproduct/${selectedCellData.productid}`);
  };

  const handleProductDelete = async (productid) => {
    console.log("productid", productid);
    try {
      console.log(productid);
      const response = await axios.delete(
        `http://localhost:3004/deleteproduct/${productid}`
      );
      console.log(response);
      setCartCount((prevCount) => prevCount - 1);
      localStorage.setItem("cartCount new", cartCount - 1);
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    window.location.reload();
  };

  //////////////////////////////////////////Data Grid for customer //////////////////////////////////////
  const getallcustomer = async () => {
    try {
      const response = await axios.get("http://localhost:3004/getallcustomer");
      setCustomers(response.data);
      console.log("retrieved customer value", customers);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };
  console.log(customers);

  React.useEffect(() => {
    getallcustomer();
  }, []);

  // const handleGetQuotation = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3004/getquotation", {
  //       customerid: selectedCellData.customerid,
  //       productname: selectedCellData.productname,
  //       productid: selectedCellData.productid,

  //     })
  //   }
  //   navigate("/getquotation");
  // };

  const columns = [
    {
      field: "select",
      headerName: "Select",
      type: "boolean",

      width: 130,
      renderCell: (params) => (
        // <ColorCheckbox
        //    checked={selectedCellData?.customerid === params.row.id}
        //  onClick={() => handleCustomerAddtoquotation(params.row)}
        // />

        <button
          style={{
            width: "100px",
            height: "30px",
            borderRadius: "5px",
            fontSize: "12px",
            lineHeight: "15px",
            marginRight: "5px",
          }}
          className="getquotation"
          onClick={() => handleCustomerAddtoquotation(params.row)}
        >
          <span
            style={{ textAlign: "center", marginRight: "5px" }}
            class="getquotation-content"
          >
            Get Quotation{" "}
          </span>
        </button>
      ),
    },
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "firstName",
      headerName: "First name",
      width: 130,
      editable: true,
      // onCechange: (event) => {
      //   setfname(event.target.value);
      //   console.log(fname);
      // },
    },
    {
      field: "lastName",
      headerName: "Last name",
      height: 70,
      width: 130,
      editable: true,
    },
    {
      field: "contact",
      headerName: "Contact",
      type: "tel",
      width: 130,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 200,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      type: "address",
      // width: 200, // Set an initial width
      minWidth: 200,
      maxWidth: 800,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <button
          class="edit-button"
          onClick={() => handlecustomerEdit(params.row)}
        >
          <svg class="edit-svgIcon" viewBox="0 0 512 512">
            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
          </svg>
          {/* onClick={() => handlecustomerEdit(params.row)}>Edit */}
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <button
          class="Btn"
          onClick={() => handlecustomerDelete(params.row.customerid)}
        >
          <div class="sign">
            <svg
              viewBox="0 0 16 16"
              class="bi bi-trash3-fill"
              fill="currentColor"
              height="18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
            </svg>
          </div>
          <div class="text">Delete</div>
          {/* onClick={() => handlecustomerDelete(params.row.customerid)}> Delete */}
        </button>
      ),
    },

    //   {
    //     field: "fullName",
    //     headerName: "Full name",
    //     description: "This column has a value getter and is not sortable.",
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //       `${params.cart.firstName || ""} ${params.cart.lastName || ""}`,
    //   },
  ];
  const rows = customers.map((customer, index) => ({
    id: index + 1,
    firstName: customer?.fname,
    lastName: customer?.lname,
    email: customer?.email,
    address: customer?.address,
    contact: customer?.contact,
    customerid: customer?._id,
  }));

  const getaddtoCart = async () => {
    try {
      const response = await axios.get("http://localhost:3004/addtocart");
      setgetCarts(response.data);

      console.log("", response.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  React.useEffect(() => {
    getaddtoCart();
  }, []);

  //console.log("Carts data", carts);

  const columnss = [
    {
      field: "id",
      headerName: "ID",
      width: 30,
      textAlign: "left",
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "productName",
      headerName: "Name",
      width: 130,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "productCode",
      headerName: "Code",
      width: 100,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "image",
      headerName: "Image",
      width: 130,
      height: 200,

      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <img
          src={params.value} // Assuming the "image" field contains the URL of the image
          alt="Product Image"
          style={{ height: 100, width: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      field: "length",
      headerName: "Length",
      type: "email",
      width: 100,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "breadth",
      headerName: "Breadth",
      type: "address",
      width: 100,
      align: "center",
      editable: true,
      headerAlign: "center",
    },
    {
      field: "coverage",
      headerName: "Coverage",
      type: "address",
      width: 100,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price",
      type: "address",
      width: 100,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "unit",
      headerName: "Unit",
      type: "address",
      width: 100,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "address",
      width: 80,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "discount",
      headerName: "Discount",
      type: "address",
      width: 100,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalprice",
      headerName: "Total Price",
      type: "address",
      width: 100,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        // <button onClick={() => handleProductEdit(params.row)}>Edit</button>
        <button
          class="edit-button"
          onClick={() => handleProductEdit(params.row)}
        >
          <svg class="edit-svgIcon" viewBox="0 0 512 512">
            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
          </svg>
          {/* onClick={() => handlecustomerEdit(params.row)}>Edit */}
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <button
          style={{
            color: "red",
            height: "30px",
            width: "100px",
            lineHeight: "30px",
            backgroundColor: "transparent",
          }}
          onClick={handleOpen}
        >
          Delete
        </button>
      ),
      renderCell: (params) => (
        // <button onClick={() => handleProductDelete(params.row.productid)}>
        //   Delete
        // </button>
        <button
          class="Btn"
          onClick={() => handleProductDelete(params.row.productid)}
        >
          <div class="sign">
            <svg
              viewBox="0 0 16 16"
              class="bi bi-trash3-fill"
              fill="currentColor"
              height="18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
            </svg>
          </div>
          <div class="text">Delete</div>
        </button>
      ),
    },
  ];
  const rowss = getcarts.map((product, index) => ({
    id: index + 1,
    productName: product?.name,
    productCode: product?.productcode,
    image: product?.image,
    length: product?.length,
    breadth: product?.breadth,
    productid: product?._id,
    coverage: product?.coverage,
    price: product?.price,
    unit: product?.unit,
    quantity: product?.quantity,
    discount: product?.discount,
    totalprice: product?.totalprice,
  }));

  return (
    <div
      style={{
        backgroundImage: `url(${Addtocartbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Navbar />
      <br />
      <h1
        style={{
          textAlign: "center",
          marginTop: "60px",
          color: "white",
          fontFamily: "serif",
        }}
        className="text-center"
      >
        All Customer Details
      </h1>

      <div style={{ textAlign: "-webkit-center" }}>
        <div
          className="masked-container"
          style={{
            height: 300,
            width: "85%",
            marginTop: "30px",
          }}
        >
          <DataGrid
            sx={{
              borderRadius: 10,
              boxShadow: 10,

              "& .MuiDataGrid-cell": {
                color: "white",
              },
              "& .MuiDataGrid-columnHeaders": {
                color: "white",
              },
              "& .MuiDataGrid-footerContainer": {
                color: "transparent",
              },
              "& .MuiDataGrid-pageSizeSelector": {
                color: "white",
              },
              "& .MuiDataGrid-pagination": {
                color: "white",
              },
              "& .MuiDataGrid-pageSizeSelector": {
                color: "white",
              },
              "& .MuiDataGrid-columnSeparator": {
                color: "yellow",
              },
            }}
            headerClassName="white-header"
            className="text-on-front"
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: rows.length === 1 ? 1 : 10,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          />
          <div className="mask"></div>
        </div>
      </div>

      {/* /////Data Grid for products */}
      <div>
        <div style={{ textAlign: "-webkit-center", marginBottom: "100px" }}>
          <div
            style={{
              width: "98%",
              minHeight: 300,
              marginTop: "30px",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                marginTop: "60px",
                color: "white",
                fontFamily: "serif",
              }}
              className="text-center"
            >
              All Products
            </h1>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div class="group select-none w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
                      <div class="">
                        <div class="text-center p-3 flex-auto justify-center">
                          <svg
                            fill="red"
                            viewBox="0 0 20 20"
                            class="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clip-rule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                          {/* <h2 style={{ color: "white" }}>Are you sure?</h2> */}
                          <p
                            style={{ color: "white" }}
                            class="font-bold text-sm text-gray-500 px-2"
                          >
                            Do you really want to delete all products ? This
                            process cannot be undone!!
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            textAlign: "center",
                          }}
                        >
                          <button
                            style={{
                              color: "#D1D5DB",
                              backgroundColor: "#374151",
                              borderRadius: "30px",
                              width: "100px",
                            }}
                          >
                            Cancel
                          </button>
                          <button>Confirm</button>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
            <div className="masked-container" style={{ color: "white" }}>
              <DataGrid
                headerClassName="white-header"
                className="text-on-front"
                rowHeight={150}
                sx={{
                  borderRadius: 10,
                  boxShadow: 10,
                  "& .MuiDataGrid-cell": {
                    color: "white",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    color: "white",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    color: "transparent",
                  },
                  "& .MuiDataGrid-pageSizeSelector": {
                    color: "white",
                  },
                  "& .MuiDataGrid-columnSeparator": {
                    color: "yellow",
                  },
                  "& .MuiDataGrid-columnHeader:hover": {
                    transform: "none !important",
                  },
                }}
                rows={rowss}
                columns={columnss}
                initialState={{
                  pagination: {
                    paginationModel: {
                      page: 0,
                      pageSize: rows.length === 1 ? 1 : 20,
                    },
                  },
                }}
                pageSizeOptions={[10, 20, 30, 40, 50]}
                disableColumnMenu
                // checkboxSelection
                columnBuffer={5}
                rowBuffer={2}
              />
              <div className="mask"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <CustomTable getcarts={getcarts} /> */}
    </div>
  );
}

export default Addtocart;
