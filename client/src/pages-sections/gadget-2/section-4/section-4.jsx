import Content from "./content"; // API FUNCTIONS

export default async function Section4({
  productData
}) {
  return <Content products={productData.data} />;
}