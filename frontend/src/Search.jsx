import React from "react";

function Search() {
  return (
    <header style={styles.header}>
      {/* Logo */}
      <div style={styles.logo}>
        🛒 <strong>E-commerce Store</strong>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        style={styles.searchBar}
      />

      {/* Filter Dropdown */}
      <select style={styles.filter}>
        <option value="">All Categories</option>
        <option value="electronics">Beauty</option>
        <option value="fashion">Fragrance</option>
        <option value="home">Funiture</option>
        <option value="books">Groceries</option>
      </select>

      {/* Navigation Buttons */}
      <div style={styles.nav}>
        <button style={styles.navButton}>Cart</button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    margin:"0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#f8f8f8",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    fontSize: "1.2rem",
  },
  searchBar: {
    padding: "8px",
    width: "30%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  filter: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
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
  },
};

export default Search;
