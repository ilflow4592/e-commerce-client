import { Product } from "app/admin/entity/product/Product";
import { useState, useEffect } from "react";

const useLocalStorageWithEvent = (key: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const newValue = localStorage.getItem(key);
      setStoredValue(newValue ? JSON.parse(newValue) : []);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChanged", handleStorageChange);
    };
  }, [key]);

  const setLocalStorage = (value: Product) => {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("localStorageChanged")); // 이벤트 발생
  };

  return [storedValue, setLocalStorage];
};

export default useLocalStorageWithEvent;
