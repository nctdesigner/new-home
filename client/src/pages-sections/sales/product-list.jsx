import Grid from "@mui/material/Grid"; // GLOBAL CUSTOM COMPONENT

import ProductCard1 from "components/product-cards/product-card-1"; // CUSTOM DATA MODEL

// ==============================================================
export default function ProductList({
  products
}) {
  return <Grid container spacing={3} minHeight={500} marginBottom={10}>
      {products.map(item => <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
          <ProductCard1 id={item._id} slug={item._id} title={item._title} price={item._price} rating={0} imgUrl={item._image} discount={10} salePrice={item._salePrice} description={item._description} category={item._category} />
        </Grid>)}
    </Grid>;
}