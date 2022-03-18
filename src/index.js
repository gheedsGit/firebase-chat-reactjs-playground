import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjZlo3Q7XHCp5BErP0sRmL9OJANKYHb0s",
  authDomain: "testproject-77a35.firebaseapp.com",
  projectId: "testproject-77a35",
  storageBucket: "testproject-77a35.appspot.com",
  messagingSenderId: "1019779870071",
  appId: "1:1019779870071:web:00ddd2c2e78c5980780572",
  measurementId: "G-CW8PQXSQ2K",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export const Context = createContext(null);

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{ app, auth, db }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
