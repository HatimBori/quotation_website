import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  //   React.useEffect(() => {
  //     if (props.open) {
  //       const timer = setTimeout(() => {
  //         console.log("open");
  //         setOpen(false);
  //       }, 1000);
  //       return () => clearTimeout(timer); // Cleanup function to clear the timer
  //     }
  //   }, [props.open]);

  //   React.useEffect(() => {
  //     handleClose();
  //   }, []);

  //   const handleClose = (event, reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }

  //     setOpen(false);
  //   };

  React.useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        setOpen(false);
      }, 3000); // Replace 3000 with your desired auto-hide duration in milliseconds
    }
    return () => {
      clearTimeout(timer); // Cleanup function to clear the timer
    };
  }, [open]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={props.open} autoHideDuration={3000} onClose={props.close}>
        <Alert
          onClose={props.close}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {props.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
