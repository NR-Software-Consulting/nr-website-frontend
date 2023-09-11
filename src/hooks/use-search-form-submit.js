import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useSearchFormSubmit = () => {
  const router = useRouter();
  const serchResult = router?.query?.searchText;
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText) {
      let route = `/search?searchText=${searchText}`;
      if (category && category !== "Select Category") {
        route += `&productType=${category}`;
        setCategory("");
      }
      router.push(route, null, { scroll: false });
      setSearchText("");
    } else {
      router.push(`/`, null, { scroll: false });
      setSearchText("");
      setCategory("");
      console.log("value2");
    }
  };
  useEffect(() => {
    if (serchResult) setSearchText(serchResult);
  }, []);
  return {
    searchText,
    category,
    setSearchText,
    setCategory,
    handleSubmit,
  };
};

export default useSearchFormSubmit;
