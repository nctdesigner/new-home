import { useEffect, useRef, useState, useTransition } from "react";
import api from "utils/__api__/products";
export default function useSearch() {
  const parentRef = useRef();
  const [_, startTransition] = useTransition();
  const [category, setCategory] = useState("*");
  const [search, setSearch] = useState("*");
  const [resultList, setResultList] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("All Categories"); // HANDLE CHANGE THE CATEGORY

  const handleCategoryChange = cat => () => {
    setCategory(cat.value);
    setCategoryTitle(cat.title);
  }; // FETCH PRODUCTS VIA API


  const getProducts = async (searchText) => {
    const data = await api.searchProducts(searchText);
    setResultList(data);
  };

  const handleSearch = e => {
    startTransition(() => {
      const value = e.target?.value;
      setSearch(value);
      if (!value) setResultList([]);else if (value) getProducts(value);else getProducts(value);
    });
  };

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);
  return {
    category,
    parentRef,
    resultList,
    handleSearch,
    categoryTitle,
    handleCategoryChange,
    search
  };
}