import { useState } from "react";
import { useRouter } from "next/navigation";
export default function useLogin() {
  const [phoneComponent, setPhoneComponent] = useState(false);
  const router = useRouter()

  const togglePhone = () => {
    if (phoneComponent) {
      router.push("/login")
    } else {
      router.push("/phone")
    }
    setPhoneComponent((state) => !state);
  };

  return {
    phoneComponent,
    togglePhone,
  };
}
