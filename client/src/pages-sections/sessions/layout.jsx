"use client";

import { usePathname } from "next/navigation"; // LOCAL CUSTOM COMPONENTS
import useLogin from "../../components/header/hooks/use-login"; // GLOBAL CUSTOM COMPONENTS
import BoxLink from "./components/box-link";
import LogoWithTitle from "./components/logo-title";
import LoginBottom from "./components/login-bottom";
import SocialButtons from "./components/social-buttons"; // GLOBAL CUSTOM COMPONENTS

import { FlexRowCenter } from "components/flex-box"; // COMMON STYLED COMPONENT

import { Wrapper } from "./styles";
export default function AuthLayout({
  children
}) {
  const {
    phoneComponent,
    togglePhone
  } = useLogin();

  const pathname = usePathname();
  let BOTTOM_CONTENT = null; // APPLIED FOR ONLY LOGIN PAGE

  if (pathname === "/login") {
    BOTTOM_CONTENT = <LoginBottom />;
  } // APPLIED FOR ONLY REGISTER PAGE

  if (pathname === "/phone") {
    BOTTOM_CONTENT = <FlexRowCenter gap={1} mt={3}>
    Don't have account?
    <BoxLink title="Register" href="/register" />
  </FlexRowCenter>;
  } // APPLIED FOR ONLY REGISTER PAGE


  if (pathname === "/register") {
    BOTTOM_CONTENT = <FlexRowCenter gap={1} mt={3}>
        Already have an account?
        <BoxLink title="Login" href="/login" />
      </FlexRowCenter>;
  } // APPLIED FOR ONLY RESET PASSWORD PAGE


  if (pathname === "/reset-password") {
    BOTTOM_CONTENT = <LoginBottom />;
    return <FlexRowCenter flexDirection="column" minHeight="100vh" px={2}>
        <Wrapper elevation={3}>{children}</Wrapper>
      </FlexRowCenter>;
  }

  return <FlexRowCenter flexDirection="column" minHeight="100vh" px={2}>
      <Wrapper elevation={3}>
        {
        /* LOGO WITH TITLE AREA */
      }
        <LogoWithTitle />

        {
        /* FORM AREA */
      }
        {children}

        {
        /* SOCIAL BUTTON AREA */
      }
        <SocialButtons phoneComponent={phoneComponent} togglePhone={togglePhone} />

        {
        /* RENDER BOTTOM CONTENT BASED ON CONDITION */
      }
        {BOTTOM_CONTENT}
      </Wrapper>
    </FlexRowCenter>;
}