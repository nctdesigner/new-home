import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent"; // MUI ICON COMPONENTS

import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "components/flex-box";
import { Carousel } from "components/carousel";
import BazaarImage from "components/BazaarImage";
import { H1, H2, H3, H6, Paragraph } from "components/Typography"; // LOCAL CUSTOM HOOKS

import useCart from "hooks/useCart"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // =====================================================

// =====================================================
export default function ProductViewDialog(props) {
  const {
    product,
    openDialog,
    handleCloseDialog
  } = props;
  const {
    state,
    dispatch
  } = useCart();
  const cartItem = state.cart.find(item => item.id === product.id);

  const handleCartAmountChange = amount => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product,
        qty: amount,
        name: product.title,
        imgUrl: product.imgGroup
      }
    });
  };

  return <Dialog open={openDialog} maxWidth={false} onClose={handleCloseDialog} sx={{
    zIndex: 1501
  }}>
      <DialogContent sx={{
      maxWidth: 900,
      width: "100%"
    }}>
        <div>
          <Grid container spacing={0}>
            <Grid item md={6} xs={12}>
              {/* <Carousel slidesToShow={1} arrowStyles={{
              boxShadow: 0,
              color: "primary.main",
              backgroundColor: "transparent"
            }}> */}
                <BazaarImage key={1} src={`data:image/png;base64,${product.imgGroup}`} alt="product" sx={{
                mx: "auto",
                width: "100%",
                objectFit: "contain",
                height: {
                  sm: 400,
                  xs: 250
                }
              }} />
              {/* </Carousel> */}
            </Grid>

            <Grid item md={6} xs={12} alignSelf="center">
              <H2>{product.title}</H2>

              <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
                CATEGORY: {product.category}
              </Paragraph>

              <H1 color="primary.main">{currency(product.salePrice)}</H1>

              <FlexBox alignItems="center" gap={1} mt={1}>
                <Rating color="warn" value={0} readOnly />
                <H6 lineHeight="1">(0)</H6>
              </FlexBox>

              <Paragraph my={2}>
                {product.description}
              </Paragraph>

              <Divider sx={{
              mb: 2
            }} />

              {!cartItem?.qty ? <Button size="large" color="primary" variant="contained" onClick={handleCartAmountChange(1)} sx={{
              height: 45
            }}>
                  Add to Cart
                </Button> : <FlexBox alignItems="center">
                  <Button size="small" color="primary" variant="outlined" sx={{
                p: ".6rem",
                height: 45
              }} onClick={handleCartAmountChange(cartItem?.qty - 1)}>
                    <Remove fontSize="small" />
                  </Button>

                  <H3 fontWeight="600" mx={2.5}>
                    {cartItem?.qty.toString().padStart(2, "0")}
                  </H3>

                  <Button size="small" color="primary" variant="outlined" sx={{
                p: ".6rem",
                height: 45
              }} onClick={handleCartAmountChange(cartItem?.qty + 1)}>
                    <Add fontSize="small" />
                  </Button>
                </FlexBox>}
            </Grid>
          </Grid>
        </div>

        <IconButton sx={{
        position: "absolute",
        top: 3,
        right: 3
      }} onClick={handleCloseDialog}>
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>;
}