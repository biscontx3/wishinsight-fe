"use client";
import react, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Hidden,
  Button,
  IconButton,
  ListItem,
  Drawer,
  List,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NextLink from "next/link";
import Image from "next/image";
import { useAppContext } from "../../store/AppContext";
import PersonIcon from "@mui/icons-material/Person";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
interface Props {
  loggedIn: RequestCookie | undefined;
}
const Header = ({ loggedIn }: Props) => {
  const [drawer, setDrawer] = useState(false);
  const [notification, setNotification] = useState(0);
  const { state, dispatch } = useAppContext();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const config = {
      withCredentials: true,
    };
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/verify`, config)
        .then((res) => {
          dispatch({
            type: "SET_USER_NAME",
            payload: res.data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state.userLoggedIn || loggedIn) {
      setUserLoggedIn(true);
      dispatch({
        type: "SET_USER_LOGGED_IN",
        payload: true,
      });
    } else {
      setUserLoggedIn(false);
      dispatch({
        type: "SET_USER_LOGGED_IN",
        payload: false,
      });
    }
  }, [state.userLoggedIn || loggedIn]);

  useEffect(() => {
    if (state.userLoggedIn || loggedIn) {
      getNotifications();
    }
  }, [loggedIn, state.userLoggedIn]);

  const logOut = async () => {
    await logoutReq();
    router.push("/");
  };

  const getNotifications = async () => {
    const config = {
      withCredentials: true,
    };
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/chat/notification`, config)
        .then((res) => {
          dispatch({
            type: "SET_NOTIFICATION",
            payload: res.data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const logoutReq = async () => {
    const config = {
      withCredentials: true,
    };
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/logout`, config)
        .then((_res) => {
          dispatch({
            type: "SET_USER_LOGGED_IN",
            payload: false,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar elevation={0} className=" font-sans" style={{ zIndex: "100" }}>
        <Toolbar className="appbar" variant="dense">
          <NextLink href="/" passHref style={{ fontWeight: "700 !important" }}>
            <span className="font-bold text-lg ">WishInsight</span>
          </NextLink>
          <>
            <Hidden mdDown>
              <div className="linkdiv">
                <div className="flex flex-grow justify-start ml-4">
                  <NextLink href="/" className="font-semibold mr-10 ">
                    Home
                  </NextLink>
                  <NextLink href="/items" className="font-semibold mr-10 ">
                    Items
                  </NextLink>
                </div>

                {!userLoggedIn && (
                  <>
                    <Button
                      className=" text-xs py-2 text-black flex items-center justify-center sign-up-btn mr-5"
                      onClick={() => {
                        dispatch({
                          type: "OPEN_LOGIN_MODAL",
                          payload: true,
                        });
                      }}
                    >
                      <PersonIcon fontSize="small" className="mr-1" />
                      Login
                    </Button>

                    <Button
                      className=" text-xs py-2 text-black flex items-center justify-center sign-up-btn p-4"
                      onClick={() => {
                        dispatch({
                          type: "OPEN_SIGN_UP_MODAL",
                          payload: true,
                        });
                      }}
                      style={{
                        height: "35px",
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}

                {userLoggedIn && (
                  <>
                    <NextLink href="/messages" className="font-semibold mr-5 ">
                      <Button
                        className=" text-xs py-2 text-black flex items-center justify-center sign-up-btn p-4"
                        style={{
                          height: "35px",
                          position: "relative",
                        }}
                      >
                        {state.notifications.length > 0 && (
                          <div
                            className="mr-3 mt-1"
                            style={{
                              background: "red",
                              height: "15px",
                              width: "15px",
                              position: "absolute",
                              top: 0,
                              right: 0,
                              borderRadius: "50%",
                            }}
                          />
                        )}
                        <EmailOutlinedIcon />
                      </Button>
                    </NextLink>
                    <NextLink href="/profile" className="font-semibold mr-5 ">
                      <Button
                        className=" text-xs py-2 text-black flex items-center justify-center sign-up-btn p-4"
                        style={{
                          height: "35px",
                        }}
                      >
                        <SupervisedUserCircleIcon />
                      </Button>
                    </NextLink>
                    <Button
                      className=" text-xs py-2 text-black flex items-center justify-center sign-up-btn p-4"
                      onClick={() => logOut()}
                      style={{
                        height: "35px",
                      }}
                    >
                      <LogoutIcon />
                    </Button>
                  </>
                )}

                {/* 
                {!validToken ? (
                  <NextLink className="mr-5" href="/login">
                    <Button className=" text-xs py-2 bg-softmain text-black flex items-center justify-center">
                      <PersonIcon fontSize="small" />
                      Login
                    </Button>
                  </NextLink>
                ) : (
                  <NextLink className="mr-5" href="/dashboard">
                    <Tooltip title="Your profile">
                      <Button className=" text-xs py-2 bg-softmain text-black flex items-center justify-center">
                        <PersonIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                  </NextLink>
                )} */}
              </div>
            </Hidden>
            <Hidden mdUp>
              <div className="flex flex-grow"></div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={() => setDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </>
          <Drawer
            className="drawerstyle-small"
            open={drawer}
            anchor="right"
            onClose={() => setDrawer(false)}
          >
            <div className="close-header-drawer">
              <CloseIcon fontSize="large" onClick={() => setDrawer(false)} />
            </div>
            <List>
              {/* {!validToken ? (
                <ListItem button>
                  <NextLink className="mr-5" href="/login">
                    Login
                  </NextLink>
                </ListItem>
              ) : (
                <ListItem button>
                  <NextLink className="mr-5" href="/dashboard">
                    Personal page
                  </NextLink>
                </ListItem>
              )} */}

              {/* <ListItem button>
                <NextLink href="/" className="font-semibold mr-10">
                  Home
                </NextLink>
              </ListItem>

              <ListItem button>
                <NextLink href="/company" className="font-semibold mr-10">
                  Companies
                </NextLink>
              </ListItem>
              <ListItem button>
                <NextLink href="/aboutus" className="font-semibold mr-10">
                  About us
                </NextLink>
              </ListItem> */}

              {/* {validToken && (
                <>
                  <ListItem button>
                    <Button
                      className="logout-header"
                      onClick={() => handleLogout()}
                    >
                      <LogoutIcon fontSize="small" />
                    </Button>
                  </ListItem>
                </>
              )} */}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
