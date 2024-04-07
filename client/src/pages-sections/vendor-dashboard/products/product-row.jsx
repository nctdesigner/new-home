import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; // MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // STYLED COMPONENTS
import api from "../../../utils/__api__/products"
import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; // ========================================================================

// ========================================================================
const ProductRow = ({
  product
}) => {
  const {
    category,
    name,
    price,
    image,
    id,
    published,
    slug,
    stock,
    saleprice,
    onSale,
    feature,
    latest
  } = product || {};
  const router = useRouter();
  const [productPublish, setProductPublish] = useState(published);
  const [onSaleState, setOnSaleState] = useState(onSale);
  const [featured, setFeaturted] = useState(feature);
  const [latestState, setLatestState] = useState(latest);

  return <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar alt={name} src={`data:image/png;base64, ${image}`} sx={{
          borderRadius: 2
        }} />

          <div>
            <Paragraph fontWeight={600}>{name}</Paragraph>
            <Small color="grey.600">#{id}</Small>
          </div>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{category}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        {stock}
      </StyledTableCell>

      <StyledTableCell align="left">{currency(price)}</StyledTableCell>
      <StyledTableCell align="left">{currency(saleprice)}</StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={productPublish} onChange={async () => {
          const response = await api.updateProducts(slug, {
            _published: !productPublish
          })
          if(response.error) {
            router.refresh();
          } else {
            alert(response.message)
            setProductPublish(state => !state)
            router.refresh();
          }
        }} />
      </StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={onSaleState} onChange={async () => {
          const response = await api.updateProducts(slug, {
            _onSale: !onSaleState
          })
          if(response.error) {
            router.refresh();
          } else {
            alert(response.message)
            setOnSaleState(state => !state)
            router.refresh();
          }
        }} />
      </StyledTableCell>
      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={featured} onChange={async () => {
          const response = await api.updateProducts(slug, {
            _featured: !featured
          })
          if(response.error) {
            router.refresh();
          } else {
            alert(response.message)
            setFeaturted(state => !state)
            router.refresh();
          }
        }} />
      </StyledTableCell>
      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={latestState} onChange={async () => {
          const response = await api.updateProducts(slug, {
            _latest: !latestState
          })
          if(response.error) {
            router.refresh();
          } else {
            alert(response.message)
            setLatestState(state => !state)
            router.refresh();
          }
        }} />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/products/${slug}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete onClick={async () => {
                try {
                  var permission = confirm("Are you sure you want to delete this product?");
                  if(permission) {
                    const response = await api.deleteProduct(slug);
                    if(response.error) {
                      router.refresh();
                    } else {
                      router.refresh();
                    }
                  }
                  } catch (error) {
                  console.log(error);
                }
          }} />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
};

export default ProductRow;