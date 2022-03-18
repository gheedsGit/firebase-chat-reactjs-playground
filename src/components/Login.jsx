import { Container, Grid, Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const { auth } = useContext(Context);
  const login = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);
  };

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50, border: "2px solid black" }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          style={{ width: 400, height: 100, background: "lightblue" }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Button onClick={login} variant="outlined">
              Login with Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
