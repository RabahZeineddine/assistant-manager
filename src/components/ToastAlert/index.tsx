import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type ToastAlertProps = {
  text: string;
  severity: "success" | "error" | "warning" | "info";
  autoHide?: boolean;
  onExited?: () => void;
};

function ToastAlert(props: ToastAlertProps) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={props.autoHide ? 6000 : null}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onExited={props.onExited}
    >
      <Alert onClose={handleClose} severity={props.severity}>
        {props.text}
      </Alert>
    </Snackbar>
  );
}

export default ToastAlert;
