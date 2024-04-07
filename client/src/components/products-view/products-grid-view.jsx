import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination"; // GLOBAL CUSTOM COMPONENTS

import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/product-card-1"; // CUSTOM DATA MODEL

// ========================================================
export default function ProductsGridView({
  products
}) {
  return <Fragment>
      <Grid container spacing={3}>
        {products.map(item => <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1 id={item._id} slug={item._id} title={item._title} price={item._price} rating={0} imgUrl={item._image} discount={10} salePrice={item._salePrice} />
          </Grid>)}
      </Grid>

      {/* <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
        <Pagination count={Math.ceil(products.length / 10)} variant="outlined" color="primary" />
      </FlexBetween> */}
    </Fragment>;
}