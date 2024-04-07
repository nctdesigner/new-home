import { BannerPageView } from "pages-sections/vendor-dashboard/banners/page-view"; // API FUNCTIONS

import api from "utils/__api__/banners";
export const metadata = {
  title: "Products - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function Products() {
  const banners = await api.getBanners();
  if(banners.error) {
    alert(banners.error)
    return null
  } else {
    return <BannerPageView products={banners.data} headerText={'Banners List'} />;
  }
}