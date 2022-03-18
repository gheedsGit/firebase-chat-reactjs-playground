import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import Chat from "./Chat";
import Login from "./Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";

const AppRouter = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  console.log(user);

  return user ? (
    <Routes>
      <Route path={CHAT_ROUTE} element={<Chat />} />
      <Route path="*" element={<Chat />} />
    </Routes>
  ) : (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
