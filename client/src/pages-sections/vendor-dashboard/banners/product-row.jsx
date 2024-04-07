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
import api from "../../../utils/__api__/banners"
import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; // ========================================================================

// ========================================================================
const ProductRow = ({
  product
}) => {
  const {
name,
title,
redirectText,
image,
id,
published
  } = product || {};
  const router = useRouter();
  const [productPublish, setProductPublish] = useState(published);

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
        {title}
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{redirectText}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={productPublish} onChange={async () => {
          const response = await api.updateBanner(id, {
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

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/admin/banner/${id}`)}>
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
                    const response = await api.deleteBanners(id);
                    if(response.error) {
                      alert(response.error)
                      router.refresh();
                    } else {
                      alert(response.message)
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