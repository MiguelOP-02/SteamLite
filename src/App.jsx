
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import GameDetail from "./pages/GameDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Library from "./pages/Library.jsx";
import Play from "./pages/Play.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/play/:id" element={<Play />} />
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />

        <Route path="/library" element={<Library />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />


      </Routes>
    </>
  );
}

export default App;
