import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Search({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) {
  const navigate = useNavigate();

  // Handle search submission
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}&category=${selectedCategory}`);
    }
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    navigate(`/products?category=${newCategory}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`);
  };

  // Reset both search and category when logo is clicked
  const handleLogoClick = () => {
    setSearchTerm('');
    setSelectedCategory('');
    navigate('/');
  };

  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        {/* Left: Logo and Store Name */}
        <Link 
          to="/" 
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={handleLogoClick}
        >
          <div style={styles.leftSection}>
            <span style={styles.logo}>🛒</span>
            <strong style={styles.storeName}>E-commerce Store</strong>
          </div>
        </Link>
        {/* Center: Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          style={styles.searchBar}
        />

        {/* Right: Navigation Buttons */}
        <div style={styles.nav}>
          <button style={styles.navButton}>Cart</button>
          <button style={styles.navButton}>Customer Service</button>
        </div>
      </header>

      {/* Category Filter */}
      <div style={styles.categoryFilter}>
        <label htmlFor="category" style={styles.filterLabel}>Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={styles.filter}
        >
          <option value="">All Categories</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#f8f8f8",
    borderBottom: "1px solid #ddd",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  logo: {
    fontSize: "1.5rem",
    marginRight: "10px",
  },
  storeName: {
    fontSize: "1.2rem",
  },
  searchBar: {
    padding: "8px",
    width: "30%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  nav: {
    display: "flex",
    gap: "10px",
  },
  navButton: {
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "orange",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  categoryFilter: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ddd",
  },
  filterLabel: {
    marginRight: "10px",
    fontWeight: "bold",
  },
  filter: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
};

export default Search;