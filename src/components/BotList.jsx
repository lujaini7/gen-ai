/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Modal, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import BotForm from "./BotForm";
import { useDispatch } from "react-redux";
import {
  useDeleteBotMutation,
  useFetchAllBotsQuery,
  useFetchSingleBotQuery,
} from "../services/bot";
import Spinner from "./Spinner";
import { deleteBot, fetchBots, createBot } from "../util";
import { toast } from "react-toastify";
import { setCurrentBot } from "../store/slices/chatbotSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function formatDate(date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function truncateText(text, maxLength, ending = "...") {
  if (text.length <= maxLength) return text; // No truncation needed

  return text.slice(0, maxLength - ending.length) + ending;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function BotList() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bots, setBots] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const { isSuccess, isLoading, data } = useFetchAllBotsQuery(user?.email);
  // const [
  //   deleteBot,
  //   { isSuccess: isDeleteSucess, isError: isDeleteError, status },
  // ] = useDeleteBotMutation();
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setId(null);
    setOpen(false);
  };
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleDelete = () => {
    try {
      if (!id) return;

      deleteBot(id);
      setBots(bots.filter((bot) => bot.id !== id));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const result = await fetchBots();
      setBots(result);
    })();
    setIsLoading(false);
  }, []);

  const handleAddBot = async (name, description) => {
    const docId = await createBot(name, description, "abc");
    setBots([
      ...bots,
      {
        id: docId,
        botName: name,
        description,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const activateBot = (bot) => {
    dispatch(setCurrentBot(bot));
  };

  // useEffect(() => {
  //   if (isDeleteSucess)
  //     toast.success("Bot deleted successfully", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  // }, [isDeleteSucess]);
  // useEffect(() => {
  //   if (isDeleteError)
  //     toast.error("Something went wrong, Try again", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  // }, [isDeleteError, status]);
  return (
    <>
      <TableContainer sx={{ marginTop: "3rem", padding: "0 3rem" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Bot Name</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Date Created</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              {/* <StyledTableCell align="center">Link</StyledTableCell> */}
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <Spinner />
          ) : (
            <TableBody>
              {bots?.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.botName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {truncateText(row.botDescription, 40)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatDate(new Date(row.createdAt))}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      className="bg-[#3A83FB]"
                      onClick={() => activateBot(row)}
                    >
                      Set Active
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex space-x-2 justify-end">
                      <Button
                        variant="contained"
                        className="bg-[#3A83FB]"
                        onClick={handleEditOpen}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpen(row.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            className="text-center"
          >
            Delete Bot
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this bot?
          </Typography>
          <div className="flex space-x-2 justify-center mt-8">
            <Button
              variant="contained"
              className="bg-[#404141]"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
      <BotForm
        open={editOpen}
        handleClose={handleEditClose}
        handleSubmit={handleAddBot}
      />
    </>
  );
}

export default BotList;
