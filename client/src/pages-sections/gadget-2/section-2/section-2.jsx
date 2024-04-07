import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS

import { H2, Paragraph } from "components/Typography";
import ProductCard11 from "components/product-cards/product-card-11"; // API FUNCTIONS

import api from "utils/__api__/products";
export default async function Section2({
  products
}) {
  return <Container>
      <Box textAlign="center" mt={8} mb={5}>
        <H2 fontSize={{
        sm: 34,
        xs: 28
      }}>Featured Products</H2>
        <Paragraph color="grey.600" fontSize={{
        sm: 16,
        xs: 14
      }}>
          Featured products from our stores
        </Paragraph>
      </Box>

      <Grid container spacing={3}>
        {products.data.map(product => <Grid item lg={3} md={4} sm={6} xs={12} key={product._id}>
            <Link href={`/products/${product._id}`}>
              <ProductCard11 description={product._description} title={product._title} image={product._image} sale={product._onSale ? true : false} regularPrice={product._price} salePrice={product._salePrice} />
            </Link>
          </Grid>)}
      </Grid>
    </Container>;
}