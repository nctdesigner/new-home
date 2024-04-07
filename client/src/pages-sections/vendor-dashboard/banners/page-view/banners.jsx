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
  id: "title",
  label: "Title",
  align: "left"
}, {
  id: "text",
  label: "Button Text",
  align: "left"
}, {
  id: "publish",
  label: "Published",
  align: "left"
}, {
  id: "action",
  label: "Action",
  align: "center"
}]; // =============================================================================

// =============================================================================
const BannersPageView = ({
  products,
  headerText
}) => {
  const [productList, setProductList] = useState([...products]); // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredProducts = productList.map(item => ({
    id: item._id,
    name: item._name,
    title: item._title,
    redirectText: item._redirectText,
    image: item._image,
    published: item._published
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

      <SearchArea handleSearch={() => {}} buttonText="Add Banner" url="/admin/banner/create" searchPlaceholder="Search Banner..." />

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

export default BannersPageView;