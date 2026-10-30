
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";

function Cart() {
  const { cart, total, removeFromCart } = useStore();

  return (
    <main className="page">
      <h1>
        <ShoppingCart size={30} style={{ verticalAlign: "middle" }} />
        {" "}Mi carrito de compras
      </h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <h2>Tu carrito está vacío</h2>
          <p>Explora nuestra tienda y agrega videojuegos.</p>
          <Link to="/" className="game-button">
            Explorar tienda
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((game) => (
              <article className="cart-item" key={game.id}>
                <img src={game.image} alt={game.title} />

                <div className="cart-item-info">
                  <h3>{game.title}</h3>
                  <p>{game.genre}</p>
                  <strong>
                    S/ {Number(game.price).toFixed(2)}
                  </strong>
                </div>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(game.id)}
                  aria-label={`Eliminar ${game.title}`}
                >
                  <Trash2 size={20} />
                </button>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Resumen de compra</h2>
            <p>Videojuegos: {cart.length}</p>

            <div className="cart-total">
              <span>Total</span>
              <strong>S/ {total.toFixed(2)}</strong>
            </div>

            <Link to="/checkout" className="checkout-button checkout-link">
                Proceder al pago
            </Link>

            <p className="cart-note">
              El formulario de pago se activará
              en el siguiente paso.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
