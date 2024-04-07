"use client";
import Link from "next/link";
import { Fragment } from "react";
import { WalletRounded } from "@mui/icons-material";
import WalletHead from "../wallet-head";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Transactions from "../transaction";
import { H3 } from "components/Typography";
import Button from "@mui/material/Button";
import { OrderCom } from "components/orderCom";
import { ShareCom } from "components/shareCom";
import { useRouter } from "next/navigation";

// ============================================================
const WalletPageView = async ({ user, authToken }) => {
  const router = useRouter()
  if(user.error) {
    router.push("/login")
  }
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}

      <DashboardHeader
        Icon={WalletRounded}
        title="Wallet"
        buttonText="Withdraw"
        href={``}
      />

      {/* USER PROFILE INFO */}
      <WalletHead user={user} />

      {user._ownTeamMembers.length < 0 ? (
        <Grid
          container
          spacing={1}
          justifyContent="center"
          style={{ marginTop: "20px" }}
        >
          <Grid item xs={12} sm={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="100%"
              bgcolor="#cfe8fc"
              border="1px solid #ddd"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              borderRadius="8px"
              padding="0px 20px"
            >
              <H3 style={{ marginTop: "10px" }}>Transactions</H3>
              {user._ownTeamMembers.map((order) => (
                <Transactions order={order} key={order._name} />
              ))}
            </Box>
          </Grid>
        </Grid>
      ) : (
        <>
        <OrderCom user={user} />
      <ShareCom user={user} />
        </>
      )}

      {/* USER PROFILE INFO */}
      {/* <UserInfo user={response} /> */}
    </Fragment>
  );
};

export default WalletPageView;
