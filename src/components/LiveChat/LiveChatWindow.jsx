/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import { TextField, Chip } from "@mui/material";
import { IoIosSend } from "react-icons/io";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { IoIosAttach } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { close, maximize, minimize } from "../../store/slices/themeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import Messages from "./Messages";
import {
  fetchConversationsByChatAndBot,
  randomColor,
  randomName,
} from "../../util";
import History from "./ChatHistory";

const chipsData = [
  "lorem ipsum",
  "consectetur adipiscing elit",
  "sed do eiusmod tempor incididunt",
  "quis nostrud",
  // "ullamco laboris nisi ut ",
];

function LiveChatWindow() {
  const ref = useRef(null);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { fullScreen } = useSelector((state) => state.theme);
  const { activeBot } = useSelector((state) => state.bot);
  const handleMaximize = () => {
    if (fullScreen) dispatch(minimize());
    else dispatch(maximize());
  };
  const handleClose = () => dispatch(close());
  const handleFileClick = () => ref.current.click();
  const [messages, setMessages] = useState([
    // {
    //   id: "1",
    //   data: "The future of SEO (Search Engine Optimization) in 2024 is characterized by several key trends and technological advancements that will shape how businesses and marketers approach digital visibility and online presence.",
    //   member: {
    //     id: "1",
    //     clientData: {
    //       color: "blue",
    //       username: "bluemoon",
    //     },
    //   },
    // },
  ]);
  const [me, setMe] = useState({
    username: randomName(),
    color: randomColor(),
  });

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        author: "Human",
        content: text,
      },
    ]);
  };

  const handleEmojiClick = (e) => {
    setText((prev) => prev + " " + e.emoji);
  };

  const handleChipClick = (e) => {
    setText((prev) => prev + " " + e.target.innerText);
  };

  useEffect(() => {
    fetchConversationsByChatAndBot(
      "Content Optimization",
      activeBot?.botName
    ).then((data) => {
      setMessages(data[0]?.conversations);
    });
  }, [activeBot]);
  return (
    <div
      className={`fixed bottom-24 right-2 ${
        fullScreen ? "h-[85%]" : "h-[70%]"
      } ${
        fullScreen ? "w-[85%]" : "w-[40%]"
      }  w-[25%] border-red-50 border-2 bg-white z-20 flex flex-col rounded-lg`}
    >
      <div className="flex gap-6 px-6 py-5 bg-[#3A83FB] h-[15%] justify-between items-center">
        <div className="flex gap-4 py-5">
          <div>
            <img
              className="rounded-[50%]"
              src="https://placehold.co/40"
              alt=""
            />
          </div>
          <div>
            <h6 className="text-white">{activeBot?.botName}</h6>
            <p className="text-xs text-white">Virtual Assistant</p>
          </div>
        </div>
        <div className="flex gap-2">
          {fullScreen ? (
            <FiMinimize2
              className="text-white cursor-pointer"
              size={18}
              onClick={handleMaximize}
            />
          ) : (
            <FiMaximize2
              className="text-white cursor-pointer"
              size={18}
              onClick={handleMaximize}
            />
          )}

          <IoClose
            className="text-white cursor-pointer"
            size={20}
            onClick={handleClose}
          />
        </div>
      </div>
      {/* main */}
      <div className="bg-white h-[70%] overflow-auto flex gap-4">
        {fullScreen && <History />}
        <Messages messages={messages} me={me} />
      </div>

      {/* footer */}
      <div className="w-[100%] border-2 py-2 pb-5 px-2">
        <div className="gap-1 flex items-center flex-wrap py-2 pb-3">
          {chipsData.map((data, i) => (
            <Chip
              size="small"
              color="primary"
              variant="outlined"
              label={data}
              key={i}
              onClick={handleChipClick}
              clickable
            />
          ))}
        </div>
        <div className="flex items-center justify-around">
          <TextField
            className="w-[75%]"
            id="outlined-basic"
            label="Start your new message"
            variant="outlined"
            size="small"
            value={text}
            onChange={handleTextChange}
          />
          <MdOutlineEmojiEmotions
            size={22}
            className="text-[#3A83FB] cursor-pointer"
            onClick={() => setOpen(!open)}
          />

          <IoIosAttach
            size={22}
            className="text-[#3A83FB] cursor-pointer"
            onClick={handleFileClick}
          />
          <input
            type="file"
            hidden
            onChange={() => {}}
            name="[licenseFile]"
            ref={ref}
          />
          <IoIosSend
            size={22}
            className="text-[#3A83FB] cursor-pointer"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <EmojiPicker
        open={open}
        width={250}
        height={300}
        searchDisabled={true}
        onEmojiClick={handleEmojiClick}
        // className="absolute bottom-40"
        style={{
          position: "absolute",
          bottom: "8rem",
          left: "2rem",
        }}
      />
    </div>
  );
}

export default LiveChatWindow;
