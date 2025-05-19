import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './page/ProductDetails';
import { useState } from 'react'
import Card from './products.jsx';

function App() {
  return (
    <>
    <div className='text-center font-bold text-lg mt-10'>
      <div className="App">
     
      </div>
    </div>
      <Router>
      <Routes>
          <Route path="/products" element={<Card />} /> 
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;