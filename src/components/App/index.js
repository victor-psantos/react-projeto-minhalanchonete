import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./../Menu"
import HomePage from "../../pages/HomePage"
import SanduichsPage from "../../pages/SanduichsPage"
import DrinksPage from "../../pages/DrinksPage"
import PortionsPage from "../../pages/PortionsPage"
import ItemPage from "../../pages/ItemPage"
import CartPage from "../../pages/CartPage"
import CartContext from "../../contexts/CartContext";


import './App.css';


function App() {
  const [cart, setCart] = useState([]);
  
  return (
    <CartContext.Provider value={{ cart, setCart }}>
    <div className="App">
          <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sanduichs" element={<SanduichsPage />} />
            <Route path="/drinks" element={<DrinksPage />} />
            <Route path="/portions" element={<PortionsPage />} />  
            <Route path="/item/:itemType/:itemId" element={<ItemPage />} /> 
            <Route path="/cart" element={<CartPage />} />          
          </Routes>
        </BrowserRouter>
    </div>
    </CartContext.Provider>
  );
}

export default App;
