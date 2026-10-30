
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const StoreContext = createContext(null);

function readStorage(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() =>
    readStorage("steamlite_cart")
  );

  const [library, setLibrary] = useState(() =>
    readStorage("steamlite_library")
  );

  useEffect(() => {
    localStorage.setItem("steamlite_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "steamlite_library",
      JSON.stringify(library)
    );
  }, [library]);

  const isOwned = (id) =>
    library.some((game) => String(game.id) === String(id));

  const isInCart = (id) =>
    cart.some((game) => String(game.id) === String(id));

  const addToCart = (game) => {
    if (isOwned(game.id) || isInCart(game.id)) return;

    setCart((previous) => [...previous, game]);
  };

  const removeFromCart = (id) => {
    setCart((previous) =>
      previous.filter((game) => String(game.id) !== String(id))
    );
  };

  const total = cart.reduce(
    (sum, game) => sum + Number(game.price),
    0
  );

  const completePurchase = () => {
    setLibrary((previous) => {
      const newGames = cart.filter(
        (game) =>
          !previous.some(
            (owned) => String(owned.id) === String(game.id)
          )
      );

      return [...previous, ...newGames];
    });

    setCart([]);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        library,
        total,
        isOwned,
        isInCart,
        addToCart,
        removeFromCart,
        completePurchase
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore debe usarse dentro de StoreProvider");
  }

  return context;
}
