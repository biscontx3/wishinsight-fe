"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAppContext } from "../../store/AppContext";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingCircular from "../Generals/LoadingCircular";
import Checkmark from "../Generals/Checkmark";
const SignUpModal = () => {
  const { state, dispatch } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch({
      type: "OPEN_SIGN_UP_MODAL",
      payload: false,
    });

    setEmail("");
    setUsername("");
    setPassword("");
    setZipCode("");
    setLoading(false);
    setUserCreated(false);
  };

  const validateZipCode = () => {
    const zipRegex = "^d{5}(?:[-s]d{4})?$";
  };

  const handleKeyPress = () => {};

  const isValidEmail = (email: string) => {
    const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return pattern.test(email);
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      zipcode: zipCode,
      username,
      password,
      email,
    };

    const config = {
      withCredentials: true,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        data,
        config
      );
      console.log(res);
      if (res.status === 200) {
        notify("User created", "success");
        setUserCreated(true);
      }
    } catch (err) {
      notify("Failed to create user", "error");
      return;
    } finally {
      setLoading(false);
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
      <Modal open={state.signUpModal} onClose={handleClose}>
        <>
          {!userCreated && (
            <form className="signup-modal" onSubmit={(e) => handleSignUp(e)}>
              <h2>Sign up</h2>
              <div className="mb-5">
                <label
                  htmlFor="zipcode"
                  className=" text-sm font-medium text-gray-900  flex items-center "
                >
                  <FmdGoodOutlinedIcon className="mr-1" fontSize="small" /> Zip
                  code{" "}
                </label>
                <div className="flex items-center ">
                  <input
                    style={{ height: "53px" }}
                    type={"text"}
                    id="zipcode"
                    value={zipCode}
                    required
                    onChange={(e) => setZipCode(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-400"
                    placeholder="Zip code"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email-signup"
                  className=" text-sm font-medium text-gray-900  flex items-center "
                >
                  <EmailOutlinedIcon className="mr-1" fontSize="small" /> Email{" "}
                </label>
                <div className="flex items-center ">
                  <input
                    style={{ height: "53px" }}
                    type={"email"}
                    id="email-signup"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-400"
                    placeholder="example@example.com"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="username-signup"
                  className=" text-sm font-medium text-gray-900  flex items-center "
                >
                  <PersonOutlineOutlinedIcon
                    className="mr-1"
                    fontSize="small"
                  />{" "}
                  Username{" "}
                </label>
                <div className="flex items-center ">
                  <input
                    style={{ height: "53px" }}
                    type={"text"}
                    id="username-signup"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-400"
                    placeholder="JumpingFox"
                  />
                </div>
              </div>

              <div className="mt-2">
                <label
                  htmlFor="password-signup"
                  className=" text-sm font-medium text-gray-900  flex items-center "
                >
                  <PasswordOutlinedIcon className="mr-1" fontSize="small" />{" "}
                  Password{" "}
                </label>
                <div className="flex items-center ">
                  <input
                    style={{ height: "53px" }}
                    type={"password"}
                    id="password-signup"
                    value={password}
                    required
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-400"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="mt-2">
                <span
                  className=" text-blue-600 font-bold cursor-pointer"
                  onClick={() => {
                    dispatch({
                      type: "OPEN_SIGN_UP_MODAL",
                      payload: false,
                    });
                    dispatch({
                      type: "OPEN_LOGIN_MODAL",
                      payload: true,
                    });
                  }}
                >
                  Already have an account? Login
                </span>
              </div>
              <div className="flex items-center justify-center mt-5 signup-btn-modal">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <LoadingCircular width={25} height={25} />
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          )}

          {userCreated && (
            <div className="checkmark-modal">
              <Checkmark />
              <h2 className="mb-8">User created successfully</h2>
              <div className="flex items-center justify-center mt-5 signup-btn-modal">
                <Button onClick={() => handleClose()}>Close</Button>
              </div>
            </div>
          )}
        </>
      </Modal>
    </>
  );
};

export default SignUpModal;
