import { useState } from "react";
import { useRouter } from "next/navigation";
export default function useAuthToken() {
  const [authToken, setAuthToken] = useState(null);

  const setToken = (token) => {
    setAuthToken(token)
  };

  const remToken = () => {
    setAuthToken(null)
  };

  return {
    authToken,
    setToken,
    remToken
  };
}
