import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "./index";
import { useContext } from "react";
import Loader from "./components/Loader";
import "./App.css";

const App = () => {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  return loading ? (
    <>
      {" "}
      <Navbar />
      <Loader />
    </>
  ) : (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
