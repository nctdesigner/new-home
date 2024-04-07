"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react"; // MUI ICON COMPONENTS

import Place from "@mui/icons-material/Place";
import Person from "@mui/icons-material/Person";
import CreditCard from "@mui/icons-material/CreditCard";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined"; // GLOBAL CUSTOM COMPONENTS
import LogoutIcon from '@mui/icons-material/Logout';
import FlexBox from "components/flex-box/flex-box";
import { Paragraph, Span } from "components/Typography"; // CUSTOM ICON COMPONENT

import CustomerService from "icons/CustomerService"; // STYLED COMPONENTS
import { WalletRounded } from "@mui/icons-material";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import CodeIcon from "@mui/icons-material/Code";

import { MainContainer, StyledNavLink } from "./styles";
export default function Navigation() {
  if (typeof window !== 'undefined') {
  const authToken = localStorage.getItem(process.env.NEXT_PUBLIC_NCTEDGE_USER_AUTHTOKEN_KEY)
  const pathname = usePathname();
  return (
    <MainContainer>
      {MENUS.map((item) => (
        <Fragment key={item.title}>
          <Paragraph p="26px 30px 1rem" color="grey.600" fontSize={12}>
            {item.title}
          </Paragraph>

          {item.list.map(({ Icon, count, href, title }) => (
            <StyledNavLink
              href={`${href}/${JSON.parse(authToken)}`}
              key={title}
              isCurrentPath={pathname.includes(href)}
            >
              <FlexBox alignItems="center" gap={1}>
                <Icon color="inherit" fontSize="small" className="nav-icon" />
                <Span>{title}</Span>
              </FlexBox>

              <Span>{count}</Span>
            </StyledNavLink>
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
          }
}
const MENUS = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: `/orders`,
        title: "Orders",
        Icon: ShoppingBagOutlined,
        // count: 5
      },
      // {
      //   href: "/wish-list",
      //   title: "Wishlist",
      //   Icon: FavoriteBorder,
      // },
      // {
      //   href: "/support-tickets",
      //   title: "Support Tickets",
      //   Icon: CustomerService,
      // },
      {
        href: "/wallet",
        title: "Wallet",
        Icon: WalletRounded,
      },
      {
        href: "/edgecode",
        title: "Edge Code",
        Icon: CodeIcon,
      },
      {
        href: "/friends",
        title: "Friends",
        Icon: Diversity1Icon,
      },
    ],
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      {
        href: "/profile",
        title: "Profile Info",
        Icon: Person,
        // count: 3
      },
      {
        href: "/logout",
        title: "Logout",
        Icon: LogoutIcon,
      },
    ],
  },
];
