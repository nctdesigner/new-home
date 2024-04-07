"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import ProductForm from "../banner-form";
import api from "../../../../utils/__api__/products"

const BannerCreatePageView = () => {
  const INITIAL_VALUES = {
    name: "",
    title: "",
    subtitle: "",
    redirectText: "",
    redirectUrl: "",
    image: []
  };

  return <Box py={4}>
      <H3 mb={2}>Add New Banner</H3>

      <ProductForm initialValues={INITIAL_VALUES} />
    </Box>;
};

export default BannerCreatePageView;