import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { signIn, setProfile } from "../store/slices/authSlice";
import { fetchProfile } from "../api/profile";

export const useLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
  const login = useGoogleLogin({
    onSuccess: (data) => dispatch(signIn(data.access_token)),
    // ux_mode: "popup",
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (token) {
      fetchProfile(token).then((data) => {
        console.log("fetched profile")
        dispatch(setProfile(data));
        navigate("/");
      });
    }
  }, [dispatch, token, navigate]);

  return login

};
