import { Fragment } from "react";
import Link from "next/link";
import AppStore from "./app-store";
import Image from "components/BazaarImage";
import { Paragraph } from "components/Typography";
export default function LogoSection() {
  return <Fragment>
      <Link href="/">
        <Image mb={0} src="/assets/images/logo2.svg" alt="logo" />
      </Link>

      <Paragraph mb={2.5} color="grey.500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida.
        Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
      </Paragraph>

      <AppStore />
    </Fragment>;
}