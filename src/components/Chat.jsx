import { Button, Container, Grid, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React, { useState, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";
import Loader from "./Loader";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const Chat = () => {
  const { auth, app, db } = useContext(Context); // with useContext hook a get db firestore ref for further usage
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");

  const messageCol = collection(db, "messages"); // collection(db ref, collectionName) i get collection snapshot 
  const q = query(messageCol, orderBy("createdAt")); // and then with query(sna, queryOptions) i recieve collection snapshot order by creation time

  const [messages, loading] = useCollectionData(q); // useCollectionData(query, options) -> [messagesArr, isLoadingState]

  const sendMessage = async () => {
    console.log(value);
    await addDoc(messageCol, {
      uid: user.uid,
      displayName: user.displayName,
      message: value,
      createdAt: serverTimestamp(),
      phtoURL: user.photoURL,
    });
    setValue("");
  };

  const getShow = async () => {
    console.log(messages);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        style={{
          height: window.innerHeight - 50,
          width: "80%",
          margin: "auto",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "60vh",
            border: "2px solid gray",
            overflowY: "auto",
            boxShadow: "10px 10px lightblue",
            marginTop: 20,
          }}
        >
          {messages.map((message) => (
            <div
              style={{
                margin: 10,
                border:
                  user.uid === message.uid
                    ? "2px solid green"
                    : "2px dashed red",
                marginLeft: user.uid === message.uid ? "auto" : 10,
                width: "fit-content",
              }}
              key={message.createdAt}
            >
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.message}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction="column"
          alignItems="flex-end"
          style={{ width: "80%" }}
        >
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            maxRows={2}
            variant="outlined"
          />
          <Button
            onClick={sendMessage}
            variant="outlined"
            style={{ marginTop: "10px" }}
          >
            Send
          </Button>
          <Button onClick={getShow}>CHECK</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
