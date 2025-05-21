import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type FC } from "react";
import { useStyles } from "./LoginStyles";
import { useNavigate } from "react-router-dom";
import { LABELS } from "./Login.data";

const Login: FC = () => {
  const classes = useStyles();
  const [securityKey, setSecurityKey] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const secretKey = import.meta.env.VITE_SECRET_KEY;
    if (securityKey === secretKey) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/home");
    } else {
      setError(true);
    }
  };
  return (
    <Box className={classes.mainPage}>
      <Paper className={classes.loginBox}>
        <Typography variant="h4" align="center">
          {LABELS.welcome}
          <br />
          {LABELS.title}
        </Typography>
        <br />
        <Typography variant="h6" align="center">
          {LABELS.securityText}
        </Typography>
        <br />

        <Box display={"flex"} flexDirection="column" gap={2} width="70%">
          <TextField
            id="outlined-basic"
            label="Security Key"
            variant="outlined"
            value={securityKey}
            onChange={(e) => setSecurityKey(e.target.value)}
            type="password"
            error={error}
            helperText={error ? "Invalid Security Key" : ""}
          />
          <Button size="large" onClick={handleLogin}>
            {LABELS.logIn}
          </Button>
        </Box>
      </Paper>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        className={classes.divider}
      />
      <Box className={classes.img}>
        <Box component="img" src="/logo.png" alt="logo" width={"65%"}></Box>
      </Box>
    </Box>
  );
};

export default Login;
