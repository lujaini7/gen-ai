import axios from "axios";

export const fetchProfile = async (token) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
