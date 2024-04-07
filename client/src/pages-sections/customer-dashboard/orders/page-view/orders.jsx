"use client";

import Link from "next/link";
import { Fragment } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag"; // Local CUSTOM COMPONENTS
import { OrderCom } from "components/orderCom";
import { ShareCom } from "components/shareCom";
import OrderRow from "../order-row";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import UserAnalytics from "../user-analytics";

// ====================================================
export default function OrdersPageView({  user }) {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={ShoppingBag} title="My Orders" />

      <UserAnalytics user={user} />

      {/* ORDER LIST AREA */}
      {user._orders.length > 0 ? (
        user._orders.map((order) => <OrderRow order={order} key={order.id} />)
      ) : (
        <>
       <OrderCom user={user} />
       <ShareCom user={user} />
        </>
      )}

      {/* ORDERS PAGINATION */}
    </Fragment>
  );
}
