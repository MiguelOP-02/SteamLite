
import { Link, NavLink } from "react-router-dom";
import {
  Gamepad2,
  ShoppingCart,
  LibraryBig
} from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";

function Navbar() {
  const { cart } = useStore();

  return (
    <header className="steam-navbar">
      <div className="steam-navbar-content">
        <Link to="/" className="steam-logo">
          <Gamepad2 size={32} />
          <span>
            Steam<span className="logo-accent">Lite</span>
          </span>
        </Link>

        <nav className="steam-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "steam-link active" : "steam-link"
            }
          >
            Tienda
          </NavLink>

          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive ? "steam-link active" : "steam-link"
            }
          >
            <LibraryBig size={18} />
            Biblioteca
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "steam-link active" : "steam-link"
            }
          >
            <ShoppingCart size={18} />
            Carrito
            <span className="cart-count">{cart.length}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
