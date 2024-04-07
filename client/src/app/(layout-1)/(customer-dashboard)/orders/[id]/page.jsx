"use client";
import { OrdersPageView } from "pages-sections/customer-dashboard/orders/page-view"; // API FUNCTIONS
import { getUser } from "utils/__api__/auth";

export default async function Orders({
  params
}) {
    const userToken = String(params.id)
    const user = await getUser({ authToken: userToken })
    return <OrdersPageView user={user} />;
  }
