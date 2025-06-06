import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import CardContainer from "./views/CardContainer";
import ProductDetails from "./views/ProductDetails";

// Helper to conditionally render Header
function Layout({ searchTerm, setSearchTerm }) {
  const location = useLocation();

  const showHeader = location.pathname === "/";

  return (
    <>
      {showHeader && <Header setSearchTerm={setSearchTerm} />}
      <Routes>
        <Route path="/" element={<CardContainer searchTerm={searchTerm} />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </Router>
  );
}

export default App;
