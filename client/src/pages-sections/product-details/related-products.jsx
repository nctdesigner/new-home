"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; // GLOBAL CUSTOM COMPONENTS

import { H3 } from "components/Typography";
import ProductCard1 from "components/product-cards/product-card-1"; // CUSTOM DATA MODEL

// ==============================================================
export default function RelatedProducts({
  products
}) {
  return <Box mb={7.5}>
      <H3 mb={3}>Related Products</H3>

      <Grid container spacing={3}>
        {products.map((item, ind) => <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1 hoverEffect id={item._id} slug={item._id} title={item._title} price={item._price} rating={0} imgUrl={item._image} discount={10} salePrice={item._salePrice} description={item._description} category={item._category} />
          </Grid>)}
      </Grid>
    </Box>;
}