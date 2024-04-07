import axios from "axios";

export const generateRefers = async (authToken, referCode) => {
  if (authToken === "" || referCode === "") {
    return {
      error: "Refercode & authtoken is required...",
    };
  }
  try {
    const response = await axios.get("http://localhost:1337/api/r2Auth/refercode", {
        headers: {
            "auth-token": JSON.parse(authToken),
            "referCode": referCode,
            "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
        }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Refercode generated succesfully..." &&
        response.status == 200
      ) {
        return response.data;
      } else {
        return {
          error: response.data.message,
        };
      }
    } else {
      return {
        error: response.data.message,
      };
    }
  } catch (error) {
    return {
      error: error.response.data.message,
    };
  }
};

