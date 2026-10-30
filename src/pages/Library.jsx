
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LibraryBig,
  Play,
  Gamepad2,
  CheckCircle2
} from "lucide-react";

import { useStore } from "../context/StoreContext.jsx";

function Library() {
  const { library } = useStore();
  const location = useLocation();

  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    fetch("/games.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el catálogo");
        }
        return response.json();
      })
      .then((data) => setCatalog(data))
      .catch((error) => console.error(error));
  }, []);

  const ownedGames = library.map((savedGame) => {
    const updatedGame = catalog.find(
      (game) => String(game.id) === String(savedGame.id)
    );

    return updatedGame
      ? { ...savedGame, ...updatedGame }
      : savedGame;
  });

  return (
    <main className="page">
      <div className="library-header">
        <div>
          <h1>
            <LibraryBig size={32} />
            Mi Biblioteca
          </h1>

          <p>
            Todos tus videojuegos adquiridos,
            listos para jugar.
          </p>
        </div>

        <div className="library-counter">
          <Gamepad2 size={22} />
          <span>{ownedGames.length} videojuegos</span>
        </div>
      </div>

      {location.state?.purchaseSuccess && (
        <div className="purchase-success">
          <CheckCircle2 size={22} />
          ¡Compra simulada exitosa!
          Tus juegos están disponibles.
        </div>
      )}

      {ownedGames.length === 0 ? (
        <div className="cart-empty">
          <Gamepad2 size={45} color="#66c0f4" />

          <h2>Tu biblioteca está vacía</h2>

          <p>
            Explora nuestra tienda y consigue
            tus primeros videojuegos.
          </p>

          <Link to="/" className="game-button">
            Explorar tienda
          </Link>
        </div>
      ) : (
        <div className="games-grid">
          {ownedGames.map((game) => (
            <article className="game-card" key={game.id}>
              <img
                src={game.image}
                alt={game.title}
                className="game-image"
              />

              <div className="game-info">
                <span className="game-genre">
                  {game.genre}
                </span>

                <h3>{game.title}</h3>

                <p>{game.description}</p>

                <div className="library-game-footer">
                  <span className="owned-label">
                    <CheckCircle2 size={16} />
                    Adquirido
                  </span>

                  <Link
                    to={`/play/${game.id}`}
                    className="game-button"
                  >
                    <Play size={17} />
                    Jugar ahora
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Library;
