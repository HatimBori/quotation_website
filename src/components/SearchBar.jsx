import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

function SearchBar() {
  return (
    <TextField
      sx={{
        backgroundColor: "white",
        color: "white",
        height: "20px",
        width: 400,
        marginLeft: "15px",
        outline: "none",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        outline: "none",
        borderRadius: "30px",
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "white", // Change the color to white when focused
            border: "none",
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
      //   value={code}
      //   onChange={getProductcode}
      placeholder="Search..."
      variant="outlined"
    />
  );
}

export default SearchBar;
