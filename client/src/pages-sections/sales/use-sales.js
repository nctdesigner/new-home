import { useEffect, useState } from "react"; // TYPESCRIPT INTERFACE FOR DATA SHAPE

// SALES API FUNCTIONS
import api from "utils/__api__/sales";
import api2 from "utils/__api__/products";
export default function useSales(defaultSelectCategory = "flower", fetchCategory = 0) {
  const PRODUCT_PER_PAGE = 4;
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(defaultSelectCategory); // HANDLE CHANGE PAGE

  const handlePageChange = (_, page) => setPage(page); // HANDLE THE CHANGE CATEGORY


  const handleCategoryChange = category => () => {
    api2.getProductsFromParams({
          _category: category
        }).then(data => 
          setProductList(data)
        );
    setSelectedCategory(category)
  }; // FETCH CATEGORIES FROM SERVER


  useEffect(() => {
    if (fetchCategory === 1) {
      api.getCategoriesTwo().then(data => setCategories(data));
    } else {
      api.getCategories().then(data => setCategories(data));
    }
  }, [fetchCategory]); // FETCH PRODUCTS FROM SERVER

  useEffect(() => {
    api2.getProductsFromParams({
      _category: 'flower'
    }).then(data => setProductList(data));
  }, [page]);
  return {
    page,
    categories,
    productList,
    selectedCategory,
    PRODUCT_PER_PAGE,
    handlePageChange,
    handleCategoryChange
  };
}