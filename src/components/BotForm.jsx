/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  FormGroup,
  Fab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { RiImageAddLine } from "react-icons/ri";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BotForm({
  open,
  handleClose,
  handleSubmit,
  edit = true,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const ref = useRef(null);
  const [uploadState, setUploadState] = useState("initial");

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {edit ? "Edit a Bot" : "Create a new Bot"}
        </Typography>
        <Typography
          variant="caption"
          id="modal-modal-description"
          sx={{ mt: 1 }}
          className="text-gray-500"
        >
          Fill in the information of the bot
        </Typography>
        <div className="mt-3 space-y-3">
          <FormGroup className="space-y-2">
            <p>Name</p>
            <TextField
              id="outlined-basic"
              //   label="Name"
              required
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="space-y-2">
            <p>Description</p>
            <TextField
              id="outlined-basic"
              // label="Description"
              value={description}
              variant="outlined"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="space-y-2 flex items-center">
            <input
              accept="image/jpeg,image/png,image/tiff,image/webp"
              className="hidden invisible"
              id="contained-button-file"
              name="logo"
              ref={ref}
              type="file"
              onChange={() => {}}
            />
            <label
              htmlFor="contained-button-file"
              className={uploadState === "uploaded" ? "hidden invisible" : null}
            >
              <Fab component="span" className="m-10 text-[#0d47a1]">
                <RiImageAddLine />
              </Fab>
            </label>
          </FormGroup>
          <button
            onClick={() => handleSubmit(name, description)}
            className=" border-1 py-2 px-3 w-[100%] bg-[#3A83FB] rounded-md text-white"
          >
            Submit
          </button>
        </div>
      </Box>
    </Modal>
  );
}
