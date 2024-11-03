import * as jose from "jose";
import axios from "axios";
export const isTokenValid = async (): Promise<boolean> => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const config = {
      headers: {
        authorization: token,
      },
    };
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/verify`, config);
    return true;
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
};

export const verifyUsername = async (): Promise<string | undefined> => {
  const token = localStorage.getItem("token");
  if (!token) {
    return undefined;
  }

  try {
    const config = {
      withCredentials: true,
    };
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/verifyname`,
      config
    );
    return res.data;
  } catch (error) {
    return undefined;
  }
};
