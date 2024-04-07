import Link from "next/link";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import East from "@mui/icons-material/East";

import { H5, Paragraph } from "components/Typography"; // Local CUSTOM COMPONENT

import TableRow from "../table-row"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; // CUSTOM DATA MODEL

// =================================================
export default function Transactions({ order }) {
  const getColor = (status) => {
    switch (status) {
      case "Active":
        return "success";

      case "InActive":
        return "primary";

      default:
        return "default";
    }
  };

  return (
    <Link href={""} style={{width:"100%" }}>
      <TableRow
        sx={{
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        }}
        style={{ backgroundColor: "aliceblue" }}
      >

        <H5 ellipsis>
          {order._name}
        </H5>

        <Box textAlign="center">
          <Chip
            size="small"
            label={order._cashback === "" ? "Active" : "In - Active"}
            color={getColor(order._cashback === "" ? "Active" : "InActive")}
          />
        </Box>

        <Paragraph
          textAlign={{
            sm: "center",
            xs: "left",
          }}
        >
          {order._userNumber !== "" ? order._userNumber : "XXXXX XXXXX"}
        </Paragraph>

        <Paragraph textAlign="center">{currency(order._cashback)}</Paragraph>

        <Box
          display={{
            sm: "inline-flex",
            xs: "none",
          }}
          justifyContent="end"
        >
          <IconButton>
            <East
              fontSize="small"
              sx={{
                color: "grey.500",
                transform: ({ direction }) =>
                  `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
              }}
            />
          </IconButton>
        </Box>
      </TableRow>
    </Link>
  );
}
