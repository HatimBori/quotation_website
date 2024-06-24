import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CategoryIcon from "@mui/icons-material/Category";

export default function Suggestion(props) {
  const SuggestionStyle = {
    outline: "none", // Remove the outline when the button is clicked
  };
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={props.options}
        onChange={props.onChange}
        value={props.value}
        sx={{
          width: 200,
          height: "40px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          backgroundColor: "white",
          color: "black",
          marginLeft: "15px",
          borderRadius: "30px",

          // "&.Mui-focused": {
          //   borderColor: "white", // Change the color to white when focused
          //   color: "white",
          // },
          // "&:hover .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "white",
          //   color: "white",
          //   // backgroundColor: "white",
          // },
          // "& fieldset": {
          //   borderColor: "white",
          // },
          // " &.MuiOutlinedInput-notchedOutline": {
          //   borderColor: "white",
          //   color: "white",
          //   backgroundColor: "white",
          // },
          // " &.Mui-focused .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "white",
          //   color: "white",
          // },

          // "&:hover fieldset": {
          //   borderColor: "white",
          //   boxShadow: "0 0 30px white",
          // },
          // "&.Mui-focused fieldset": {
          //   boxShadow: "0 0 30px white",
          //   borderColor: "white",
          // },
          // "& label": {
          //   color: "white", // Set default text color to white
          // },

          // "& label.Mui-focused": {
          //   color: "white",
          // },
          // "&.MuiAutocomplete-inputFocused": {
          //   borderColor: "white",
          //   backgroundColor: "white", //for background set
          //   boxShadow: "0 0 60px white",
          //   color: "grey",
          // },
          "&  .MuiInputBase-input": {
            color: "black",
          },
          "& .MuiOutlinedInput-root": {
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
          "& label.Mui-focused": {
            color: "white",
          },
        }}
        renderInput={(params) => (
          <TextField
            sx={{ border: "none", outline: "none", color: "black" }}
            {...params}
            label={props.label}
            InputLabelProps={{
              style: {
                color:
                  params.inputProps.value || params.focused ? "white" : "black",
              },
            }}
          />
        )}
      />
    </>
  );
}
