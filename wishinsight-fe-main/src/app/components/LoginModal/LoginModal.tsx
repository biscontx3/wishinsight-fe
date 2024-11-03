"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useAppContext } from "../../store/AppContext";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import axios from "axios";
import LoadingCircular from "../Generals/LoadingCircular";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const LoginModal = () => {
  const { state, dispatch } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch({
      type: "OPEN_LOGIN_MODAL",
      payload: false,
    });

    setUsername("");
    setPassword("");
    setLoading(false);
  };

  const postLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      username: username.toLowerCase(),
      password,
    };
    const config = {
      withCredentials: true,
    };

    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, user, config)
        .then((res) => {
          if (res.status) {
            dispatch({
              type: "SET_USER_LOGGED_IN",
              payload: true,
            });
            notify("Login successful", "success");
            handleClose();
            router.push("/profile");
          }
        });
    } catch (error) {
      notify("Failed to login", "error");
      dispatch({
        type: "SET_USER_LOGGED_IN",
        payload: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && username && password) {
      postLogin(event);
    }
  };

  const notify = (msg: string, type: "success" | "error") =>
    toast(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      type: type,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "dark",
    });

  return (
    <>
      <Modal open={state.loginModalOpen} onClose={handleClose}>
        <>
          <form className="login-modal" onSubmit={(e) => postLogin(e)}>
            <h2>Login</h2>

            <div className="mb-5">
              <label
                htmlFor="username-login"
                className=" text-sm font-medium text-gray-900  flex items-center "
              >
                <PersonOutlineOutlinedIcon className="mr-1" fontSize="small" />{" "}
                Username
              </label>
              <div className="flex items-center ">
                <input
                  style={{ height: "53px" }}
                  type={"text"}
                  id="username-login"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-400"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="password-login"
                className=" text-sm font-medium text-gray-900  flex items-center "
              >
                <PasswordOutlinedIcon className="mr-1" fontSize="small" />{" "}
                Password{" "}
              </label>
              <div className="flex items-center ">
                <input
                  style={{ height: "53px" }}
                  type={"password"}
                  id="password-login"
                  value={password}
                  required
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-400"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-5 signup-btn-modal">
              <Button type="submit" disabled={loading}>
                {loading ? <LoadingCircular width={25} height={25} /> : "Login"}
              </Button>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
};

export default LoginModal;
