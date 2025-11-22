import { Route, Routes } from "react-router";
import HomePage from "@/pages/HomePage";
import Header from "@/components/Header";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="auth">
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
        </Route>

        <Route path="products" element={<ProductsPage />} />
      </Routes>
    </main>
  );
}
