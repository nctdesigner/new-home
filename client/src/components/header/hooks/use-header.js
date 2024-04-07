import { useState } from "react";
import { useRouter } from 'next/navigation';
import { setAuthToken } from "../../../global"
export default function useHeader() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const toggleDialog = () => {
    const authToken = window.localStorage.getItem(process.env.NEXT_PUBLIC_NCTEDGE_USER_AUTHTOKEN_KEY)
    if (authToken) {
      setAuthToken(authToken)
      router.push(`/profile/${JSON.parse(authToken)}`) 
    } else {
      setDialogOpen(state => !state)
    }
  };

  const toggleSidenav = () => setSidenavOpen(state => !state);

  const toggleSearchBar = () => setSearchBarOpen(state => !state);

  return {
    dialogOpen,
    sidenavOpen,
    searchBarOpen,
    toggleDialog,
    toggleSidenav,
    toggleSearchBar
  };
}