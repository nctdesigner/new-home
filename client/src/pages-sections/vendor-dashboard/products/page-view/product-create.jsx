"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import ProductForm from "../product-form";
import api from "../../../../utils/__api__/products"

const ProductCreatePageView = () => {
  const INITIAL_VALUES = {
    name: "",
    model: "",
    stock: "",
    price: "",
    category: [],
    sale_price: "",
    description: "",
    image: []
  };

  return <Box py={4}>
      <H3 mb={2}>Add New Product</H3>

      <ProductForm initialValues={INITIAL_VALUES} />
    </Box>;
};

export default ProductCreatePageView;