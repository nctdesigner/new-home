import Link from "next/link";
import { Fragment } from "react";

import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx"; // LOCAL CUSTOM HOOKS

import useHeader from "./hooks/use-header"; // GLOBAL CUSTOM COMPONENTS
import useLogin from "./hooks/use-login"; // GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box"; // LOCAL CUSTOM COMPONENTS

import MobileHeader from "./components/mobile-header";
import DialogDrawer from "./components/dialog-drawer";
import CategoriesMenu from "./components/categories-menu";
import LoginCartButtons from "./components/login-cart-buttons"; // STYLED COMPONENTS

import { HeaderWrapper, StyledContainer } from "./styles"; // ==============================================================

// ==============================================================
export default function Header({
  isFixed,
  className,
  midSlot
}) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const {
    dialogOpen,
    sidenavOpen,
    toggleDialog,
    toggleSidenav,
    toggleSearchBar,
    searchBarOpen
  } = useHeader();
  const {
    phoneComponent,
    togglePhone
  } = useLogin();
  const CONTENT_FOR_LARGE_DEVICE = <Fragment>
      {
      /* LEFT CONTENT - LOGO AND CATEGORY */
    }
      <FlexBox minWidth={100} alignItems="center">
        <Link href="/home">
          <LazyImage src={require("../../../public/assets/images/logo2.svg")} alt="logo" />
        </Link>

        {
        /* SHOW DROP DOWN CATEGORY BUTTON WHEN HEADER FIXED */
      }
        {isFixed ? null : null}
      </FlexBox>

      {
      /* SEARCH FORM | NAVIGATION */
    }
      {midSlot}

      {
      /* LOGIN AND CART BUTTON */
    }
      <LoginCartButtons toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} toggleSearchBar={toggleSearchBar} searchBarOpen={searchBarOpen} />

      {
      /* LOGIN FORM DIALOG AND CART SIDE BAR  */
    }
      <DialogDrawer dialogOpen={dialogOpen} sidenavOpen={sidenavOpen} toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} phoneComponent={phoneComponent} togglePhone={togglePhone} />
    </Fragment>;
  return <HeaderWrapper className={clsx(className)}>
      <StyledContainer>{downMd ? <MobileHeader /> : CONTENT_FOR_LARGE_DEVICE}</StyledContainer>
    </HeaderWrapper>;
}