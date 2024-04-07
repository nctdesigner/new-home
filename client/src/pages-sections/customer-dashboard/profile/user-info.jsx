import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery"; // GLOBAL CUSTOM COMPONENTS

import FlexBox from "components/flex-box/flex-box";
import { Small, Span } from "components/Typography"; // CUSTOM DATA MODEL

// ==============================================================
export default function UserInfo({
  user
}) {
  const downMd = useMediaQuery(theme => theme.breakpoints.down("sm"));
  return <Card sx={{
    mt: 3,
    display: "flex",
    flexWrap: "wrap",
    p: "0.75rem 1.5rem",
    alignItems: "center",
    justifyContent: "space-between",
    ...(downMd && {
      alignItems: "start",
      flexDirection: "column",
      justifyContent: "flex-start"
    })
  }}>
      <TableRowItem title="Name" value={user._name} />
      <TableRowItem title="Email" value={user._email} />
      <TableRowItem title="Phone" value={user._number === "" ? "XXXXX XXXXX" : user._number} />
      <TableRowItem title="Best Friend" value={'Mukesh Ambani ( Reliance )'} />
      <TableRowItem title="Edge Code" value={user._referCode !== "" ? user._referCode : '******'} />
    </Card>;
}

function TableRowItem({
  title,
  value
}) {
  return <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5}>
        {title}
      </Small>

      <Span>{value}</Span>
    </FlexBox>;
}