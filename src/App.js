import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { CartProvider } from "./context/CartContext";
import { Home } from "./pages/Home/Home";
import { Menu } from "./pages/Menu/Menu";
import { Jobs } from "./pages/Jobs/Jobs";
import { HygieneAndQuality } from "./pages/HygieneAndQuality/HygieneAndQuality";
import "./App.css";
import { Search } from "./pages/Search/Search";
import { CustomBurger } from "./pages/CustomBurger/CustomBurger";
import { Cart } from "./pages/Cart/Cart";
import { GoalsImpact } from "./components/GoalsImpact/GoalsImpact";
import { DownloadMobileApp } from "./pages/DownloadMobileApp/DownloadMobileApp";
import { UrbanCodeCollection } from "./pages/UrbanCodeCollection/UrbanCodeCollection";
import { CityTalksCollection } from "./pages/CityTalksCollection/CityTalksCollection";
import { Profile } from "./pages/Profile/Profile";
import { WorkInRestaurant } from "./pages/WorkInRestaurant/WorkInRestaurant";
import { WorkInOffice } from "./pages/WorkInOffice/WorkInOffice";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { NothingForgotten } from "./pages/NothingForgotten/NothingForgotten";
import { ProceedOrder } from "./pages/ProceedOrder/ProceedOrder";

function App() {
  return (
    <CartProvider>
      <div className="app">
          <Header />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/custom-burger" element={<CustomBurger />} />
              <Route path="/impact-strategy" element={<GoalsImpact />} /> 
              <Route path="/hygiene-and-quality" element={<HygieneAndQuality />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/search" element={<Search />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/nothing-forgotten" element={<NothingForgotten />} />
              <Route path="/proceed-order" element={<ProceedOrder />} />
              <Route path="/download-app" element={<DownloadMobileApp />} />
              <Route path="/urban-code" element={<UrbanCodeCollection />} />
              <Route path="/city-talks" element={<CityTalksCollection />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/work-in-restaurant" element={<WorkInRestaurant />} />
              <Route path="/work-in-office" element={<WorkInOffice />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </main>

          <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
