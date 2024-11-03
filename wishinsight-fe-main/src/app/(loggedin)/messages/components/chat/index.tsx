"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../../../store/AppContext";
import SendIcon from "@mui/icons-material/Send";
import { TextField, InputAdornment } from "@mui/material";
import LoadingLinear from "../../../../components/Generals/LoadingLinear";
const Chat = () => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [loadingNewMsg, setLoadingNewMsg] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const config = {
          withCredentials: true,
        };
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/verifyname`,
          config
        );

        setLoggedInUser(res.data);
      } catch (error) {
        console.log("Failed to fetch username", error);
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    if (loggedInUser && state.selectedParticipant) {
      const name = state.selectedParticipant;
      getChatHistory(name);
      setNewMessage("");
    }
  }, [state.selectedParticipant, loggedInUser]);

  useEffect(() => {
    if (!state.selectedParticipant) return;
    //@ts-ignore
    document.querySelector(".chat-wrap").scrollTop = document.querySelector(
      ".chat-wrap"
    ).scrollHeight;
  }, [messages]);

  const getChatHistory = async (name: string) => {
    setLoading(true);
    const config = {
      withCredentials: true,
    };

    try {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/chat/participants/${name}`,
          config
        )
        .then((res) => {
          setMessages(res.data.sort((a: any, b: any) => a.created - b.created));
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const messageFromUser = (message: any) => {
    return message.from.toLowerCase() === loggedInUser.toLowerCase();
  };

  const sendNewMessage = async () => {
    setLoadingNewMsg(true);
    const config = {
      withCredentials: true,
    };

    const data: any = {
      to: state.selectedParticipant,
      message: newMessage,
    };

    try {
      messages.push({
        ...data,
        created: Math.floor(new Date().getTime() / 1000),
        from: loggedInUser.toLowerCase(),
      });
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, data, config);
    } catch (error) {
      console.log(error);
    } finally {
      setNewMessage("");
      setLoadingNewMsg(false);
      getChatHistory(state.selectedParticipant);
    }
  };

  return (
    <>
      {state.selectedParticipant && (
        <div className="flex flex-col flex-1">
          <div
            className={`chat-wrap mt-10  flex-col p-10 ${loading && "blur"}`}
          >
            {messages.map((msg: any, index: number) => {
              return (
                <div
                  key={index}
                  className={` flex flex-1 mb-5 ${
                    messageFromUser(msg) ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex ">
                      <small>{msg.from}</small>
                    </div>
                    <div
                      className="chat-bubble"
                      style={{
                        background: messageFromUser(msg)
                          ? "#00479240"
                          : "#c1cad680",
                      }}
                    >
                      {msg.message}
                    </div>
                    <small style={{ textAlign: "end" }}>
                      {new Date(msg.created * 1000).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
          {loading && (
            <div className="loading-chat flex items-center justify-center flex-col">
              <>
                <LoadingLinear height={50} width={50} />
                <p>Loading messages</p>
              </>
            </div>
          )}
          <div className="chat-input flex items-center ">
            <TextField
              id="chat-box-input"
              hiddenLabel={true}
              className="w-full"
              disabled={loadingNewMsg}
              value={newMessage}
              multiline
              rows={2}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={"Type your message"}
              style={{
                backgroundColor: `#fff`,
                borderRadius: "9px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SendIcon
                      onClick={() => sendNewMessage()}
                      style={{
                        color: "gray",
                      }}
                      className="cursor-pointer"
                    />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
