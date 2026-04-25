import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { Preloader } from "@/components/Preloader";

import Home from "./pages/index";
import Menu from "./pages/menu";
import Locations from "./pages/locations";
import Story from "./pages/ourstory";
import Franchise from "./pages/franchise";

function App() {
  const location = useLocation();
  const lenisRef = useSmoothScroll();

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <>
      <Preloader /> {/* ✅ this is all you need */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/our-story" element={<Story />} />
      </Routes>
    </>
  );
}

export default App;