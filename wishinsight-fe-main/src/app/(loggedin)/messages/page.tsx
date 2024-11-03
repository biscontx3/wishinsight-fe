"use client";
import { useState, useEffect } from "react";
import SideBar from "./components/sidebar";
import axios from "axios";
import Chat from "./components/chat";
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  useEffect(() => {
    getParticipants();
  }, []);

  const getParticipants = async () => {
    setLoading(true);
    const config = {
      withCredentials: true,
    };

    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/chat/participants`, config)
        .then((res) => {
          setParticipants(res.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen  items-start justify-between mt-20">
      <SideBar participants={participants} loading={loading} />
      <Chat />
    </div>
  );
};

export default Page;
