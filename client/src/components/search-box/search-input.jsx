import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; // LOCAL CUSTOM HOOKS
import Link from "next/link";
import useHeader from "../header/hooks/use-header"


import useSearch from "./hooks/use-search"; // LOCAL CUSTOM COMPONENT

import SearchResult from "./components/search-result"; // STYLED COMPONENT

import { SearchOutlinedIcon } from "./styles";
export default function SearchInput() {
  const {
    handleSearch,
    parentRef,
    resultList,
    search
  } = useSearch();

    const {
    toggleSearchBar,
  } = useHeader();

  const INPUT_PROPS = {
    sx: {
      border: 1.5,
      borderColor: "crimson",
      height: 44,
      paddingRight: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": {
        border: 0
      }
    },
    endAdornment: <Link href={`/products/search/${search}`} style={{
      height: "100%"
    }}><Button color="primary" onClick={() => {
      toggleSearchBar
      handleSearch
    }} disableElevation variant="contained" sx={{
      px: "3rem",
      height: "100%",
      borderRadius: "0 4px 4px 0"
    }}>
        Search
      </Button> </Link>,
    startAdornment: <SearchOutlinedIcon fontSize="small" />
  };
  return <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto" {...{
    ref: parentRef
  }}>
      <TextField fullWidth variant="outlined" placeholder="Searching for..." onChange={handleSearch} InputProps={INPUT_PROPS} />

      {
      /* SHOW SEARCH RESULT LIST */
    }
      {resultList.length > 0 ? <SearchResult results={resultList} toggleSearchBar={toggleSearchBar} /> : null}
    </Box>;
}