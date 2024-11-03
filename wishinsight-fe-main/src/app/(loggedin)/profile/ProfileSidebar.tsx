import { useAppContext } from "../../store/AppContext";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
const ProfileSideBar = () => {
  const { state, dispatch } = useAppContext();

  const handleActive = (active: number) => {
    dispatch({
      type: "SET_ACTIVE_DASHBOARD",
      payload: active,
    });
  };
  return (
    <div className="sidebar-chat flex min-h-screen  flex-col pt-10  bg-white">
      <Drawer
        variant="permanent"
        sx={{
          paddingTop: "3rem",
          width: "250px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            paddingTop: "3rem",
            width: "250px",
          },
        }}
      >
        <List className="pt-20">
          <ListItem
            disablePadding
            onClick={() => {
              handleActive(0);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <DashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={" Dashboard"} />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() => {
              handleActive(1);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <ViewListRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={" Your wishlist"} />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            onClick={() => {
              handleActive(2);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartCheckoutRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={" Your selling items"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {/* <h2 className="text-center text-2xl font-semibold mb-10">
        <span className="capitalize text-2xl font-semibold break-words">
          {state.loggedInUser}
        </span>
      </h2>
      <Divider className="w-full" />
      <div className="w-full flex flex-col justify-center items-center">
        <span
          className="text-xl font-normal p-4 cursor-pointer"
          onClick={() => {
            handleActive(0);
          }}
        >
          Dashboard
        </span>
        <Divider className="w-full" />
        <span
          className="text-xl font-normal p-4 cursor-pointer"
          onClick={() => {
            handleActive(1);
          }}
        >
          Your wishlist
        </span>
        <Divider className="w-full" />
        <span
          className="text-xl font-normal p-4 cursor-pointer"
          onClick={() => {
            handleActive(2);
          }}
        >
          Your selling items
        </span>
      </div>
      <Divider /> */}
    </div>
  );
};

export default ProfileSideBar;
