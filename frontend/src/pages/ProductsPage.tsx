import api from "@/lib/axios";
import { useEffect } from "react";

export default function ProductsPage() {
  useEffect(() => {
    // Fetch products from the backend API
    api
      .get("/products")
      .then((response) => {
        console.log("Products:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return <div>ProductsPage</div>;
}
