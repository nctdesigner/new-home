"use client";

import Link from "next/link";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENTS

import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward"; // LOCAL CUSTOM HOOK

import useCarousel from "./useCarousel"; // GLOBAL CUSTOM COMPONENTS

import { Carousel } from "components/carousel";
import { FlexBetween } from "components/flex-box";
import { H2, Paragraph } from "components/Typography";
import ProductCard11 from "components/product-cards/product-card-11"; // CUSTOM DATA MODEL

// ==============================================================
export default function Content({
  products
}) {
  const {
    carouselRef,
    responsive,
    handleNext,
    handlePrev
  } = useCarousel();
  return <Container>
      <FlexBetween mt={10} mb={5}>
        <div>
          <H2 fontSize={{
          sm: 34,
          xs: 28
        }}>New Arrival Products</H2>
          <Paragraph color="grey.600" fontSize={{
          sm: 16,
          xs: 14
        }}>
            Newest arrivals at our stores
          </Paragraph>
        </div>

        <div>
          <IconButton onClick={handlePrev}>
            <ArrowBack fontSize="small" />
          </IconButton>

          <IconButton onClick={handleNext} sx={{
          backgroundColor: "white",
          boxShadow: 2,
          ml: 0.5
        }}>
            <ArrowForward fontSize="small" />
          </IconButton>
        </div>
      </FlexBetween>

      <Carousel ref={carouselRef} slidesToShow={4} responsive={responsive} arrows={false}>
        {products.map(product => <Link key={product._id} href={`/products/${product._id}`}>
        <ProductCard11 description={product._description} title={product._title} image={product._image} sale={product._onSale ? true : false} regularPrice={product._price} salePrice={product._salePrice} />
          </Link>)}
      </Carousel>
    </Container>;
}