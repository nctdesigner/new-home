import { Children, cloneElement, Fragment, useState } from "react";
import Menu from "@mui/material/Menu";
// ===============================================================
export default function BazaarMenu({
  open,
  handler,
  children,
  direction = "left",
  shouldCloseOnItemClick = true,
  ...props
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);

  const handleClick = event => setAnchorEl(event.currentTarget);

  const handleMenuItemClick = customOnClick => () => {
    if (customOnClick) customOnClick();
    if (shouldCloseOnItemClick) handleClose();
  };

  return <Fragment>
      {handler && cloneElement(handler, {
      onClick: handler.props.onClick || handleClick
    })}

      <Menu anchorEl={anchorEl} onClose={handleClose} open={open !== undefined ? open : !!anchorEl} anchorOrigin={{
      vertical: "bottom",
      horizontal: direction
    }} transformOrigin={{
      vertical: "top",
      horizontal: direction
    }} {...props}>
        {Children.map(children, child => cloneElement(child, {
        onClick: handleMenuItemClick(child.props.onClick)
      }))}
      </Menu>
    </Fragment>;
}