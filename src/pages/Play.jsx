
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";
import TicTacToe from "../games/TicTacToe.jsx";
import Snake from "../games/Snake.jsx";
import Memory from "../games/Memory.jsx";
function Play() {
  const { id } = useParams();
  const { library, isOwned } = useStore();

  const game = library.find(
    (item) => String(item.id) === id
  );

  if (!isOwned(id) || !game) {
    return (
      <main className="page">
        <LockKeyhole size={40} color="#66c0f4" />
        <h1>Videojuego no disponible</h1>
        <p>
          Primero debes adquirir este videojuego
          en la tienda.
        </p>

        <Link to="/" className="game-button">
          Ir a la tienda
        </Link>
      </main>
    );
  }

  return (
    <main className="play-container">
      <Link to="/library" className="back-link">
        <ArrowLeft size={18} />
        Volver a mi biblioteca
      </Link>

      <h1>{game.title}</h1>

      <div className="game-screen">
        
        
        {id === "1" ? (
        <Snake />
        ) : id === "2" ? (
        <TicTacToe />
        ) : id === "3" ? (
        <Memory />
        ) : (
        <div className="game-coming-soon">
            <h2>Videojuego no disponible</h2>
        </div>
        )}


      </div>
    </main>
  );
}

export default Play;
