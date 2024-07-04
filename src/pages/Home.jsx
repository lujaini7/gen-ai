import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LiveChatBtn from "../components/LiveChat/LiveChatBtn";
import LiveChatWindow from "../components/LiveChat/LiveChatWindow";
import { useSelector } from "react-redux";

function Home() {
  const { chatWindowIsOpen } = useSelector((state) => state.theme);

  return (
    <div>
      <div className="min-h-[90vh] flex">
        <Sidebar />
        <Main />
        <ToastContainer />
      </div>
      {chatWindowIsOpen && <LiveChatWindow />}

      <LiveChatBtn />
    </div>
  );
}

export default Home;
