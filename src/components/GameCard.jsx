
import { Link } from "react-router-dom";
import { Star, Gamepad2 } from "lucide-react";

function GameCard({ game }) {
  return (
    <article className="game-card">
      <img
        src={game.image}
        alt={game.title}
        className="game-image"
      />

      <div className="game-info">
        <span className="game-genre">{game.genre}</span>

        <h3>{game.title}</h3>

        <div className="game-rating">
          <Star size={16} fill="#facc15" color="#facc15" />
          <span>{game.rating}</span>
        </div>

        <p>{game.description}</p>

        <div className="game-bottom">
          <strong className="game-price">
            {game.price === 0
              ? "GRATIS"
              : `S/ ${game.price.toFixed(2)}`}
          </strong>

          <Link to={`/game/${game.id}`} className="game-button">
            <Gamepad2 size={17} />
            Ver juego
          </Link>
        </div>
      </div>
    </article>
  );
}

export default GameCard;
