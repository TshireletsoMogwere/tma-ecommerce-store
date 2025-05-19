import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './page/ProductDetails';
import { useState } from 'react'
import Card from './products.jsx';

function App() {
  return (
    <>
    <div className='text-center font-bold text-lg mt-10'>
      <h1>E-commerce Store</h1>
      <div className="App">
        <Card />
      </div>
    </div>
      <Router>
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;