import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import { useLogin } from "../hooks/useLogin";
function Nav() {
  const { user } = useSelector((state) => state.auth);
  const login = useLogin();

  return (
    <div className="flex justify-between px-20 py-2 border-2 border-slay-500 items-center min-h-[10vh]">
      <div className="flex items-center">
        <img src={logo} width={60} height={60} alt="" />
        <h1 className="text-2xl">Chatbot.io</h1>
      </div>
      {user ? (
        <Profile />
      ) : (
        <div>
          <button
            className="text-lg border-1 py-1 px-4 bg-[#3A83FB] rounded-md text-white"
            onClick={login}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

export default Nav;
