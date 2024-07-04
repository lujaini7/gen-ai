import logo from "../../assets/logo-removebg-preview.png";
import { IoMdHelpCircle } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { BiComment } from "react-icons/bi";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchChatsByBotName } from "../../util";
import { setRecents } from "../../store/slices/chatbotSlice";



function History() {
  const dispatch = useDispatch();
  const { activeBot, chatRecents } = useSelector((state) => state.bot);
  useEffect(() => {
    if (activeBot) {
      fetchChatsByBotName(activeBot?.botName)
        .then((data) => {
          dispatch(setRecents(data));
        })
        .catch((err) => console.log(err));
    }
  }, [activeBot, dispatch]);
  return (
    <div className="w-[20%] bg-gray-100 px-3 flex flex-col gap-8 py-4">
      <div className="logo flex items-center justify-center gap-2">
        <img src={logo} alt="" width={50} height={50} className="rounded-sm" />
        <h2>Zuchatbot</h2>
      </div>
      <div className="body flex flex-col gap-4 p-3 bg-gray-50">
        <p className="text-sm">Recent</p>
        <div className="flex flex-col gap-1">
          {chatRecents.map((recent, i) => (
            <div
              key={i}
              className="flex gap-1 items-center cursor-pointer hover:bg-gray-200 p-2"
            >
              <BiComment className="w-4" />
              <p className="truncate text-sm">{recent?.chat_title}</p>
            </div>
          ))}
        </div>
        <div>
          <TextField
            className="w-[75%]"
            id="outlined-basic"
            label="New Chat"
            variant="outlined"
            size="small"
          />
        </div>
      </div>
      <div className="extra flex flex-col gap-2 bg-gray-50 p-3">
        <div className="flex gap-2 items-center cursor-pointer">
          <IoMdHelpCircle />
          <p className="text-sm">Help</p>
        </div>
        <div className="flex gap-2 items-center cursor-pointer">
          <IoSettings />
          <p className="text-sm">Settings</p>
        </div>
      </div>
    </div>
  );
}

export default History;
