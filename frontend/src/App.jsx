import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ProductPage from './components/ProductDetails';
import Card from './components/products.jsx';
import Search from './components/Search.jsx';
import LimitedProductsList from './components/limitedProducts.jsx'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <Router>
      <div className='text-center font-bold text-lg mt-10'>
        <div className="App">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Card
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
            />
          }
        />
        {/* Add this route to handle search navigation */}
        <Route
          path="/products"
          element={
            <Card
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
            />
          }
        />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;