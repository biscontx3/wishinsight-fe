"use client";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAppContext } from "../../store/AppContext";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingCircular from "../Generals/LoadingCircular";
import Checkmark from "../Generals/Checkmark";
import { TextField, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const UserMessage = ({ user }: any) => {
  const { state, dispatch } = useAppContext();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [msgSent, setMsgSent] = useState(false);
  const [hideInput, setHideInput] = useState(false);

  useEffect(() => {
    if (state.userLoggedIn) {
      setDisabled(false);
    }
  }, [state.userLoggedIn]);

  const sendUserMessage = async () => {
    setLoading(true);
    const config = {
      withCredentials: true,
    };
    const data = {
      to: user.createdBy,
      message,
    };
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, data, config)
        .then((res) => {
          if (res.status === 200) {
            setMsgSent(true);
            setHideInput(true);
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="mt-5">
          {msgSent && (
            <div className="flex w-full items-center justify-center">
              Message sent!
            </div>
          )}
          {!loading && !hideInput && (
            <TextField
              id="chat-box-input"
              hiddenLabel={true}
              className="w-full"
              disabled={disabled}
              value={disabled ? "Sign in to message" : message}
              multiline
              rows={2}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`${disabled ? "" : "Initate contact with the user"}`}
              style={{
                backgroundColor: `#fff`,
                borderRadius: "9px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SendIcon
                      onClick={() => sendUserMessage()}
                      style={{
                        color: "gray",
                      }}
                      className="cursor-pointer"
                    />
                  </InputAdornment>
                ),
              }}
            />
          )}
          {loading && (
            <div className="flex items-center justify-center w-full flex-col">
              <p>Sending message</p>
              <LoadingCircular width={40} height={40} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserMessage;
