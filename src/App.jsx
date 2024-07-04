import { useEffect } from "react";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { fetchProfile } from "./api/profile";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "./store/slices/authSlice";

function App() {
  const { token, user } = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (token && !user) {
  //     console.log("setting profile");
  //     fetchProfile(token).then((data) => {
  //       dispatch(setProfile(data));
  //     });
  //     navigate("/");
  //   }
  // }, [dispatch, token, user, navigate]);

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/" exact />
          </Route>
          <Route element={<SignIn />} path="/login" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
