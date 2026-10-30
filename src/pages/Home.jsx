
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import GameCard from "../components/GameCard.jsx";

function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Todos");

  useEffect(() => {
    fetch("/games.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el catálogo");
        }
        return response.json();
      })
      .then((data) => setGames(data))
      .catch((error) => console.error(error));
  }, []);

  const genres = [
    "Todos",
    ...new Set(games.map((game) => game.genre))
  ];

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "Todos" || game.genre === genre;

    return matchesSearch && matchesGenre;
  });

  return (
    <main className="home-container">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">TU UNIVERSO GAMER</span>
          <h1>Descubre tu próximo videojuego favorito</h1>
          <p>
            Explora, compra y disfruta de videojuegos
            directamente desde SteamLite.
          </p>
          <a href="#catalogo" className="hero-button">
            Explorar catálogo
          </a>
        </div>
      </section>

      <section id="catalogo" className="catalog-section">
        <h2>Catálogo de videojuegos</h2>
        <p className="catalog-subtitle">
          Encuentra el juego perfecto para ti.
        </p>

        <div className="catalog-controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar videojuegos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="games-grid">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <p className="empty-message">
            No se encontraron videojuegos.
          </p>
        )}
      </section>
    </main>
  );
}

export default Home;
