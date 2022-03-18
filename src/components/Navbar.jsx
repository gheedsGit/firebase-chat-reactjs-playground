import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";

const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat
          </Typography>
          {user ? (
            <NavLink
              to={CHAT_ROUTE}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button
                onClick={() => auth.signOut()}
                color="inherit"
                variant="outlined"
              >
                Logout
              </Button>
            </NavLink>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
