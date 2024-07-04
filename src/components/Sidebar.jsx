import { useState } from "react";
import { MenuList, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { AiFillDashboard } from "react-icons/ai";
import { IoChatbubbles } from "react-icons/io5";

function Sidebar() {
  const [active, setActive] = useState(0);
  return (
    <div className="w-[15%] py-4 bg-gray-100">
      <MenuList>
        <MenuItem
          sx={{
            backgroundColor: active == 0 ? "#3A83FB" : "",
            borderRadius: "1rem",
            margin: "0 0 1rem 0",
          }}
          onClick={() => setActive(0)}
        >
          <ListItemIcon>
            <AiFillDashboard />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </MenuItem>
        <MenuItem
          sx={{
            backgroundColor: active == 1 ? "#3A83FB" : "",
            borderRadius: "1rem",
            margin: "0 0 1rem 0",
          }}
          onClick={() => setActive(1)}
        >
          <ListItemIcon>
            <IoChatbubbles />
          </ListItemIcon>
          <ListItemText>Chatlogs</ListItemText>
        </MenuItem>
      </MenuList>
    </div>
  );
}

export default Sidebar;
