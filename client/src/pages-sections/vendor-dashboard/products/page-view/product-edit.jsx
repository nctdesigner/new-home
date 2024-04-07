"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import ProductForm from "../product-form";

import api from "../../../../utils/__api__/products"
import { useRouter } from "next/navigation";

const EditProductPageView = async ({ productId }) => {
  const router = useRouter()
  const productData = await api.getProduct(productId)
  if (productData.error) {
    alert(productData.error)
    router.push('/admin/products')
  } else {
  const INITIAL_VALUES = {
    name: productData._title,
    model: productData._modelNumber,
    stock: productData._stock,
    price: productData._price,
    category: productData._category.split(","),
    sale_price: productData._salePrice,
    description: productData._description,
    image: productData._image.split(",")            
  };

  const handleFormSubmit = () => {};

  return <Box py={4}>
      <H3 mb={2}>Edit Product</H3>

      <ProductForm initialValues={INITIAL_VALUES} handleFormSubmit={handleFormSubmit} productId={productId} />
    </Box>;
  }
};

export default EditProductPageView;