import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

export default function SuggestionWithAdd(props) {
  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      options={props?.options}
      onChange={props.onChange}
      value={props.value}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      selectOnFocus
      clearOnBlur={false}
      disableClearable
      sx={{
        width: "250px",
        borderColor: "white",
        "&  .MuiInputBase-input": {
          color: "white",
        },
        "&.Mui-focused": {
          borderColor: "white", // Change the color to white when focused
          color: "white",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
          color: "white",
          //backgroundColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
          boxShadow: "0 0 30px white",
        },
        "& fieldset": {
          borderColor: "white",
        },
        " &.MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
          color: "white",
          backgroundColor: "white",
        },
        " &.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
          color: "white",
        },

        "&:hover fieldset": {
          borderColor: "white",
          boxShadow: "0 0 30px white",
        },
        "&.Mui-focused fieldset": {
          boxShadow: "0 0 30px white",
          borderColor: "white",
        },
        "& label": {
          color: "white", // Set default text color to white
        },

        "& label.Mui-focused": {
          color: "white",
        },
        // "&.MuiAutocomplete-inputFocused": {
        //   borderColor: "white",
        //   backgroundColor: "white", //for background set
        //   boxShadow: "0 0 60px white",
        //   color: "grey",
        // },
      }}
    />
  );
}
