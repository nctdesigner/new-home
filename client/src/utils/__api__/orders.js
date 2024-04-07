import { cache } from "react";
import axios from "axios";
export const getOrders = async ({ authToken }) => {
  const response = await axios.get("http://localhost:1337/api/rAuth/user", {
    headers: {
      "auth-token": JSON.parse(authToken),
      "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD
    }
  });
  return response.data;
};
export const getIds = cache(async () => {
  const response = await axios.get("/api/users/order-ids");
  return response.data;
});
export const getOrder = cache(async id => {
  const response = await axios.get("/api/users/order", {
    params: {
      id
    }
  });
  return response.data;
});