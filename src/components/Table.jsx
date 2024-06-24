import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #e0e0e0",
  borderBottom: "1px solid #e0e0e0",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: "bold",
    border: "1px solid #e0e0e0",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  border: "1px solid #e0e0e0", // Add border to the table container
  borderRadius: 8,
}));
const StyledTable = styled(Table)({
  borderRadius: 8, // Apply border radius to the table
  border: "1px solid #e0e0e0",
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function CustomTable(props) {
  return (
    <div
      style={{
        justifyContent: "center",
        textAlign: "-webkit-center",
        marginTop: "20px",
      }}
    >
      <StyledTableContainer
        sx={{ borderRadius: 15,  width: 1200 }}
        component={Paper}
      >
        <StyledTable
          sx={{
            justifyContent: "center",
            textAlign: "-webkit-center",
            minWidth: 300,
            maxWidth: 1200,
            border: "black",
          }}
          aria-label="customized table"
        >
          <TableHead>
          <TableRow>
    <StyledTableCell colSpan={12} height={100} align="center" style={{ backgroundColor: "white", color: "black",fontSize: "20px" }}>
    Shree Mahalaxmi Granites And Tiles
      {/* {props.customerData?.fname} */}
    </StyledTableCell>
  </TableRow>

            <TableRow>
            <StyledTableCell component="th" scope="row" align="left">Sr No.</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Code</StyledTableCell> 
              <StyledTableCell align="center">Length</StyledTableCell>
              <StyledTableCell align="center">Breadth</StyledTableCell>
              <StyledTableCell align="center">Coverage</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>   
              <StyledTableCell align="center">Unit</StyledTableCell>
              <StyledTableCell align="center">Discount</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Total price</StyledTableCell>
           
              {/* <StyledTableCell align="right">{props.customerData.email}</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.getcarts.map((row,index) => (

              <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row" align="left">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.productcode}
                </StyledTableCell>
               
                <StyledTableCell align="center">{row?.length}</StyledTableCell>
                <StyledTableCell align="center">{row?.breadth}</StyledTableCell>
                <StyledTableCell align="center">{row?.coverage}</StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  <img src={row.image} alt={row.name} style={{ width: 150, height: 100 }} />
                </StyledTableCell>
             
                <StyledTableCell align="center">{row?.unit}</StyledTableCell>
                <StyledTableCell align="center">{row?.quantity}</StyledTableCell>
                <StyledTableCell align="center">{row?.discount}</StyledTableCell>
                <StyledTableCell align="center">{row?.price}</StyledTableCell>
                <StyledTableCell align="center">
                  {row?.totalprice}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </div>
  );
}
