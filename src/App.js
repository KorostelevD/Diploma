import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/Home/Home";
import { Menu } from "./pages/Menu/Menu";
import { Jobs } from "./pages/Jobs/Jobs";
import { HygieneAndQuality } from "./pages/HygieneAndQuality/HygieneAndQuality";
import "./App.css";
import { Search } from "./pages/Search/Search";
import { CustomBurger } from "./pages/CustomBurger/CustomBurger";
import { Cart } from "./pages/Cart/Cart";
import { GoalsImpact } from "./components/GoalsImpact/GoalsImpact";

function App() {
  return (
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
          </Routes>
        </main>

        <Footer />
    </div>
  );
}

export default App;
