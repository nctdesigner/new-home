"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; // GLOBAL CUSTOM COMPONENTS

import { H3 } from "components/Typography";
import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table"; // GLOBAL CUSTOM HOOK

import useMuiTable from "hooks/useMuiTable"; // Local CUSTOM COMPONENT

import ProductRow from "../product-row";
import SearchArea from "../../search-box"; // CUSTOM DATA MODEL

// TABLE HEADING DATA LIST
const tableHeading = [{
  id: "name",
  label: "Name",
  align: "left"
}, {
  id: "category",
  label: "Category",
  align: "left"
},{
  id: "stock",
  label: "Stock",
  align: "left"
}, {
  id: "price",
  label: "Price",
  align: "left"
}, {
  id: "sale",
  label: "Sale",
  align: "left"
}, {
  id: "published",
  label: "Publish",
  align: "center"
}, {
  id: "onsale",
  label: "Sales ",
  align: "center"
}, {
  id: "feature",
  label: "Feature",
  align: "center"
}, {
  id: "latest",
  label: "Latest",
  align: "center"
}, {
  id: "action",
  label: "Action",
  align: "center"
}]; // =============================================================================

// =============================================================================
const ProductsPageView = ({
  products,
  headerText
}) => {
  const [productList, setProductList] = useState([...products]); // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredProducts = productList.map(item => ({
    id: item._modelNumber,
    slug: item._id,
    name: item._title,
    brand: item._brand,
    price: item._price,
    image: item._image,
    published: item._published,
    category: item._category,
    stock: item._stock,
    saleprice: item._salePrice,
    onsale: item._onSale,
    feature: item._featured,
    latest: item._latest
  }));
  const {
    order,
    orderBy,
    selected,
    filteredList,
    handleRequestSort
  } = useMuiTable({
    listData: filteredProducts
  });
  return <Box py={4}>
      <H3 mb={2}>{headerText ? headerText : 'Products List'}</H3>

      <SearchArea handleSearch={() => {}} buttonText="Add Product" url="/admin/products/create" searchPlaceholder="Search Product..." />

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={products.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map((product, index) => <ProductRow key={index} product={product} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

      </Card>
    </Box>;
};

export default ProductsPageView;