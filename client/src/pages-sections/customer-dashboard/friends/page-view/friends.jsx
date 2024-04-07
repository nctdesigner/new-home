"use client";

import Link from "next/link";
import { Fragment } from "react";
import OrderRow from "../order-row";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import Grid from "@mui/material/Unstable_Grid2";
import { OrderCom } from "components/orderCom";
import { ShareCom } from "components/shareCom";
import { useRouter } from "next/navigation";
import UserAnalytics from "../user-analytics";
// ====================================================
export default function FriendsPageView({ orders, user }) {
  const router = useRouter()
  if(user.error) {
    router.push("/login")
  }
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={Diversity1Icon} title="Friends" />

      <UserAnalytics user={user} />

      {/* ORDER LIST AREA */}

      {orders.length < 0 ? (
        orders.map((order) => <OrderRow order={order} key={order._name} />)
      ) : (
        <>
               <OrderCom user={user} />
      <ShareCom user={user} />
        </>
      )}

      {/* {orders.map(order => <OrderRow order={order} key={order._name} />)} */}

      {/* ORDERS PAGINATION */}
      {/* <Pagination count={5} onChange={data => console.log(data)} /> */}
    </Fragment>
  );
}
