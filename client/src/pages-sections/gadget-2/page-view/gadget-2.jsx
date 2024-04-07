// LOCAL CUSTOM SECTION COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";

import api from "../../../utils/__api__/banners"
import api2 from "../../../utils/__api__/products"

export default async function GadgetTwoPageView() {
  const bannerSection3 = await api.getBanner("66110729326c0aa699dc025a");
  const banner1Section6 = await api.getBanner("6611149be77a19ddb2f027c4");
  const banner2Section6 = await api.getBanner("661114dee77a19ddb2f027c9");
  const products = await api2.getFeaturedProducts();
  const productData = await api2.getLatestProducts();
  const banner1 = await api.getBanner("66112f0a6e6a1e81153f53ac")
  const banner2 = await api.getBanner("66112e6a6e6a1e81153f539f")
  const banner3 = await api.getBanner("66112ee76e6a1e81153f53a9")
  const banner4 = await api.getBanner("66112fc26e6a1e81153f53af")
  const banner5 = await api.getBanner("66112fe66e6a1e81153f53b2")
  const banner6 = await api.getBanner("661132484cd296a119194f57")

  return <div className="bg-white">
      {
      /* GRID CARD SECTION */
    }
      <Section1 banner1={banner1} banner2={banner2} banner3={banner3} banner4={banner4} banner5={banner5} banner6={banner6} />

      {
      /* BEST SELLER PRODUCTS SECTION */
    }

    {
      products.data.length > 0 ? <Section2 products={products} /> : null
    }

      {
      /* APPLE WATCH BANNER SECTION */
    }


      {
        !bannerSection3.error ? <Section3 data={bannerSection3} /> : null
      }
      
      {
        productData.data.length > 0 ? <Section4 productData={productData} /> : null
      }

      {
        !banner1Section6.error && !banner2Section6.error ? <Section5 banner1={banner1Section6} banner2={banner2Section6} /> : null
      }
    

      {
      /* LATEST BLOG SECTION */
    }
      {/* <Section6 /> */}

      {
      /* SERVICE LIST SECTION */
    }
      <Section7 />

      {
      /* NEWSLETTER SECTION */
    }
      <Section8 />
    </div>;
}