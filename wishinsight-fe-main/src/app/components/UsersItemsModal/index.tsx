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
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserMessage from "./UserMessage";

const UsersItemsModal = () => {
  const { state, dispatch } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch({
      type: "OPEN_USERS_ITEMS_MODAL",
      payload: false,
    });
    setUsers([]);
  };

  useEffect(() => {
    if (state.usersItemsModal) {
      fetchUsers();
    }
  }, [state.usersItemsModal]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${encodeURIComponent(
            state.itemToFetchUsers
          )}`
        )
        .then((res) => {
          setUsers(res.data.result);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  interface UserObj {
    price: number;
    description: string;
    createdBy: string;
    amount: number;
    recurrence: string;
  }

  return (
    <>
      <Modal open={state.usersItemsModal} onClose={handleClose}>
        <div className="users-items-modal ">
          {loading ? (
            <div className="flex flex-col flex-1 items-center justify-center">
              <h3>Loading Users...</h3>
              <LoadingCircular width={60} height={60} />
            </div>
          ) : (
            <>
              {" "}
              <h2 className="mb-5">{state.itemToFetchUsers}</h2>
              <h3 className="flex flex-1 mb-5 mr-3 justify-end">
                Price per single item
              </h3>
              <div className="flex flex-col ">
                {users
                  .sort((a: UserObj, b: UserObj) => b.price - a.price)
                  .map((user: UserObj, index: number) => {
                    return (
                      <Accordion
                        key={index + user?.createdBy}
                        className="mb-2 user-acc"
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <div className="flex justify-between flex-1">
                            <b className="capitalize"> {user?.createdBy} </b>
                            <span className="flex items-center">
                              <b className="text-green-700 mr-1">$</b>
                              {user?.price}{" "}
                              <span className="mx-1 ">
                                per {user?.recurrence}
                              </span>
                            </span>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails
                          style={{ backgroundColor: "#c1cad640" }}
                        >
                          <div className="flex flex-col mt-1">
                            {<p className="mb-1">Quantity: {user?.amount}</p>}
                            {user.description ? (
                              <>
                                <h3>Item description</h3>
                                {user.description}
                              </>
                            ) : (
                              <small>No description available</small>
                            )}
                            <UserMessage user={user} />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      //   <span
                      //     key={user?.createdBy}
                      //     className="mb-1 p-3 font-bold text-lg flex justify-between"
                      //     style={{ borderBottom: "1px solid lightgray" }}
                      //   >
                      //     {user?.createdBy}
                      //     <span>
                      //       <b className="text-green-700 mr-1">$</b>
                      //       {user?.price}
                      //     </span>

                      //   </span>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UsersItemsModal;
