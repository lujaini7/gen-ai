/* eslint-disable no-unused-vars */
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useFetchAllBotsQuery, useCreateBotMutation } from "../services/bot";
import { useSelector } from "react-redux";
import BotList from "./BotList";
import { toast } from "react-toastify";
import { createBot } from "../util";
import BotForm from "./BotForm";

function Main() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [createPost, { isSuccess, isError, status }] = useCreateBotMutation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (name, description) => {
    if (!name || !description) return;
    try {
      const data = {
        name,
        description,
        email: user?.email,
      };
      createPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess)
      toast.success("Bot created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }, [isSuccess]);
  useEffect(() => {
    if (isError)
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }, [isError, status]);
  const handleAddBot = async (name, description) => {
    const docId = await createBot(name, description, "abc");
  };
  return (
    <div className="w-[85%] z-10">
      <div className="flex justify-between px-20 mt-4 items-center">
        <h2 className="text-xl">Dashboard</h2>
        <div
          className="bg-[#3A83FB] flex px-3 py-2 items-center space-x-2 cursor-pointer"
          onClick={handleOpen}
        >
          <FaPlus />
          <p>Create Bot</p>
        </div>
      </div>
      <BotList />
      <BotForm
        open={open}
        handleSubmit={handleAddBot}
        handleClose={handleClose}
        edit={false}
      />
    </div>
  );
}

export default Main;
