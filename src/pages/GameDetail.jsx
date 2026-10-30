
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";

function GameDetail() {
  const { id } = useParams();
  const { addToCart, isInCart, isOwned } = useStore();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("/games.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el videojuego");
        }
        return response.json();
      })
      .then((games) => {
        const selectedGame = games.find(
          (item) => String(item.id) === id
        );
        setGame(selectedGame || null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <main className="page">Cargando videojuego...</main>;
  }

  if (error) {
    return <main className="page">{error}</main>;
  }

  if (!game) {
    return (
      <main className="page">
        <h1>Videojuego no encontrado</h1>
        <Link to="/">Volver a la tienda</Link>
      </main>
    );
  }

  return (
    <main className="detail-container">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} />
        Volver a la tienda
      </Link>

      <div className="detail-layout">
        <img
          src={game.image}
          alt={game.title}
          className="detail-image"
        />

        <div className="detail-info">
          <span className="game-genre">{game.genre}</span>

          <h1>{game.title}</h1>

          <div className="game-rating">
            <Star size={19} fill="#facc15" color="#facc15" />
            <span>{game.rating} / 5</span>
          </div>

          <p>{game.description}</p>

          <h2 className="detail-price">
            {game.price === 0
              ? "GRATIS"
              : `S/ ${game.price.toFixed(2)}`}
          </h2>

          
            {isOwned(game.id) ? (
            <Link to="/library" className="game-button">
                En tu biblioteca
            </Link>
            ) : isInCart(game.id) ? (
            <Link to="/cart" className="game-button">
                Ver carrito
            </Link>
            ) : (
            <button
                className="detail-buy-button"
                onClick={() => addToCart(game)}
            >
                <ShoppingCart size={20} />
                {game.price === 0
                ? "Obtener gratis"
                : "Agregar al carrito"}
            </button>
            )}


          <p className="detail-note">
            La función de compra se activará cuando
            implementemos el carrito.
          </p>
        </div>
      </div>

      <section className="detail-reviews">
        <h2>Reseñas de jugadores</h2>
        {game.reviews?.length > 0 ? (
          game.reviews.map((review, index) => (
            <p key={index}>{review}</p>
          ))
        ) : (
          <p>Todavía no hay reseñas para este videojuego.</p>
        )}
      </section>
    </main>
  );
}

export default GameDetail;
