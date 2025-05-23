import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { type FC } from "react";
import { LABELS } from "../login/Login.data";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./HeaderStyles";

const Header: FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };
  const classes = useStyles();

  return (
    <Box>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center", ml: 10 }}
          >
            {LABELS.title}
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            {LABELS.logOut}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
