
import { FlexBox } from "components/flex-box";

import navigation from "data/navbarNavigation"; // STYLED COMPONENTS

import { StyledNavLink, NAV_LINK_STYLES, ChildNavListWrapper } from "../styles"; // DATA TYPES

export default function NavigationList() {
  const renderNestedNav = (list = [], isRoot = false) => {
    return list.map(nav => {
      if (isRoot) {
          return <StyledNavLink href={nav.url} key={nav.title}>
              {nav.title}
            </StyledNavLink>;
      }
    });
  };

  return <FlexBox gap={4}>{renderNestedNav(navigation, true)}</FlexBox>;
}