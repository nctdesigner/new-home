"use client"
import { EdgeCodePageView } from "pages-sections/customer-dashboard/edge-code/page-view"; // API FUNCTIONS
import { getUser } from "utils/__api__/auth";
// export const metadata = {
//   title: "Edge Code - NCTEdge",
//   description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
//   authors: [
//     {
//       name: "UI-LIB",
//       url: "https://ui-lib.com",
//     },
//   ],
//   keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
// };
export default async function EdgeCode({
  params
}) {
  const userToken = String(params.id)
      const user = await getUser({ authToken: userToken });
      return <EdgeCodePageView user={user} authToken={userToken}/>;
  }
