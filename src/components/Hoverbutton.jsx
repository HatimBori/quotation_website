import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "3px 12px",

  lineHeight: 1.5,
  backgroundColor: "#474747",

  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    border: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    border: "none",
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#474747"),
  backgroundColor: "transparent",
  fontSize: "20px",
  position: "relative",
  overflow: "hidden",
  zIndex: 3,
  "&:hover": {
    color: "#f8de22",

    transition: "all 0.3s ease-in-out",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "0%",
      height: "2px",
      backgroundColor: "#f8de22",
      transition: "width 0.3s ease-in-out",
    },
  },
  "&:hover::after": {
    transform: "translateX(0)",
    transition: "width 0.3s ease-in-out",
    width: "100%",
  },
}));

export default function Hoverbutton(props) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (props.to) {
      navigate(props.to);
    }
  };

  const buttonStyle = {
    outline: "none", // Remove the outline when the button is clicked
  };
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <ColorButton
        className="navbarAnimation"
        style={buttonStyle}
        onClick={handleButtonClick}
      >
        {props.text}
      </ColorButton>
    </Stack>
  );
}
