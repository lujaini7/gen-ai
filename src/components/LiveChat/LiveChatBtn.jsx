import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { open, close } from "../../store/slices/themeSlice";

export default function LiveChatBtn() {
  const dispatch = useDispatch();
  const { chatWindowIsOpen } = useSelector((state) => state.theme);
  const { activeBot } = useSelector((state) => state.bot);
  const handleClick = () => {
    if (!activeBot) return alert("Please Activate Bot First");
    if (chatWindowIsOpen) {
      dispatch(close());
    } else dispatch(open());
  };
  return (
    <button
      className="fixed bottom-6 right-7 w-16 h-16 rounded-[50%] cursor-pointer  flex justify-center items-center bg-[#3A83FB] z-30"
      onClick={handleClick}
    >
      <IoChatbubbleEllipsesOutline className="h-[40%] w-[60%] text-white" />
    </button>
  );
}
