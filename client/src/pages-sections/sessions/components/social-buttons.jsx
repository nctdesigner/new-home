import { usePathname } from "next/navigation"; // LOCAL CUSTOM COMPONENTS
import { Fragment } from "react";
import Image from "next/image"; // MUI

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider"; // CUSTOM COMPONENTS

import { Span } from "components/Typography"; // IMPORT IMAGES

import googleLogo from "../../../../public/assets/images/icons/google.png";
import facebookLogo from "../../../../public/assets/images/icons/phone-call.png"; // =======================================
import mailLogo from "../../../../public/assets/images/icons/email.png"; // =======================================

// =======================================
export default function SocialButtons(props) {
  const {
    togglePhone,
    phoneComponent
  } = props;
  const pathname = usePathname();
  return <Fragment>
      {
      /* DIVIDER */
    }
      <Box my={3}>
        <Divider>
          <Span lineHeight={1} px={1}>
            or
          </Span>
        </Divider>
      </Box>

    {
      phoneComponent ? pathname === "/register" ? <Button fullWidth size="large" className="facebookButton" sx={{
        fontSize: 12
      }} startIcon={<Image alt="facebook" src={facebookLogo} />} onClick={togglePhone}>
          Continue with Mobile
        </Button> : <Button fullWidth size="large" className="facebookButton" sx={{
        fontSize: 12
      }} startIcon={<Image alt="facebook" src={mailLogo} />} onClick={togglePhone}>
          Continue with E - Mail
        </Button> : <Button fullWidth size="large" className="facebookButton" sx={{
      fontSize: 12
    }} startIcon={<Image alt="facebook" src={facebookLogo} />} onClick={togglePhone}>
        Continue with Mobile
      </Button>
    }

      {
      /* GOOGLE BUTTON */
    }
      <Button fullWidth size="large" className="googleButton" sx={{
      fontSize: 12
    }} startIcon={<Image alt="google" src={googleLogo} />}>
        Continue with Google
      </Button>
    </Fragment>;
}