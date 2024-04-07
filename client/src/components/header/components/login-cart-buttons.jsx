import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENT
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import PersonOutline from "@mui/icons-material/PersonOutline"; // CUSTOM ICON COMPONENT
import Icon from "icons"; // LOCAL CUSTOM COMPONENTS
import ShoppingBagOutlined from "icons/ShoppingBagOutlined"; // GLOBAL CUSTOM HOOK
import { FlexBetween, FlexBox } from "components/flex-box"; // GLOBAL CUSTOM HOOK
import { Paragraph } from "components/Typography";
import Clear from "@mui/icons-material/Clear"; // CUSTOM ICON COMPONENTS
import { SearchInput } from "components/search-box";

import useCart from "hooks/useCart"; // ==============================================================

// ==============================================================
export default function LoginCartButtons({
  toggleDialog,
  toggleSidenav,
  toggleSearchBar,
  searchBarOpen,
}) {
  const { state } = useCart();
  const ICON_COLOR = {
    color: "grey.600",
  };
  const ICON_STYLE = {
    color: "grey.600",
    fontSize: 20,
  };
  return (
    <div>
      <IconButton onClick={toggleSearchBar}>
        <Icon.Search sx={ICON_STYLE} />
      </IconButton>

      <IconButton onClick={toggleDialog}>
        <PersonOutline sx={ICON_COLOR} />
      </IconButton>

      <Badge badgeContent={state.cart.length} color="primary">
        <IconButton onClick={toggleSidenav}>
          <ShoppingBagOutlined sx={ICON_COLOR} />
        </IconButton>
      </Badge>
      <Drawer open={searchBarOpen} anchor="top" onClose={toggleSearchBar} sx={{
      zIndex: 9999
    }}>
        <Box width="auto" padding={2} height="100vh">
          <FlexBetween mb={1}>
            <Paragraph>Search In NCT Enterprises</Paragraph>

            <IconButton onClick={toggleSearchBar}>
              <Clear />
            </IconButton>
          </FlexBetween>

          {
          /* CATEGORY BASED SEARCH FORM */
        }
          <SearchInput />
        </Box>
      </Drawer>
    </div>
    
  );
}
