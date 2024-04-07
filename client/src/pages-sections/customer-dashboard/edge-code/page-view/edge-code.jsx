"use client";
import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import CodeIcon from "@mui/icons-material/Code";
import Code from "../code";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import { generateRefers } from "utils/__api__/refers";
import Button from "@mui/material/Button";
import generate__edge__code from "lib/generate-edge-code";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { OrderCom } from "components/orderCom";
import { ShareCom } from "components/shareCom";

// ============================================================
const EdgeCodePageView = async ({ user, authToken }) => {
  const router = useRouter();
  if(user.error) {
    router.push("/login")
  }

  const generateEdgeCode = async () => {
    const edgeCode = generate__edge__code();
    const generatedReferCode = await generateRefers(authToken, edgeCode);
    if (generatedReferCode.error) {
      alert(generatedReferCode.error);
      router.push("/login");
    } else {
      console.log("pushed");
      router.refresh();
    }
  };

  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      {user._referCode === "" ? (
        <DashboardHeader
          Icon={CodeIcon}
          title="Edge Code"
          buttonText="Generate Code"
          clickAction={generateEdgeCode}
        />
      ) : (
        <DashboardHeader
          Icon={CodeIcon}
          title="Edge Code"
          buttonText="Share Code"
          href={`https://wa.me/?text=Check%20out%20this%20awesome%20website%21%20http%3A%2F%2Flocalhost%3A3000%2Fphone%2F${user._referCode}`}
        />
      )}

      {/* USER PROFILE INFO */}
      <Code user={user} />

      <OrderCom user={user} />
      <ShareCom user={user} />

      {/* Nctedge Adsense */}

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
            height="150px"
            bgcolor="#cfe8fc"
            border="1px solid #ddd"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            borderRadius="8px"
            padding="0px 20px"
          >
            <h4>NCTEdge AdSense</h4>
          </Box>
        </Grid>
      </Grid>

      {/* Google Adsense */}
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
            height="150px"
            bgcolor="#cfe8fc"
            border="1px solid #ddd"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            borderRadius="8px"
            padding="0px 20px"
          >
            <h4>Google AdSense</h4>
          </Box>
        </Grid>
      </Grid>

      {/* USER PROFILE INFO */}
      {/* <UserInfo user={response} /> */}
    </Fragment>
  );
};

export default EdgeCodePageView;
