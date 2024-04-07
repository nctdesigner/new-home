import Link from "next/link";
import MenuItem from "@mui/material/MenuItem"; // STYLED COMPONENT
import { SearchResultCard } from "../styles"; // ==============================================================

// ==============================================================
export default function SearchResult({
  results, toggleSearchBar
}) {
  return <SearchResultCard elevation={2}>
      {results.map(item => <Link href={`/products/search/${item._title}`} onClick={toggleSearchBar} key={item._id}>
          <MenuItem key={item._id}>{item._title}</MenuItem>
        </Link>)}
    </SearchResultCard>;
}