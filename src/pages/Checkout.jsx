
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, ShieldCheck } from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Ingresa al menos 3 caracteres")
    .required("El nombre es obligatorio"),

  email: Yup.string()
    .email("Ingresa un correo válido")
    .required("El correo es obligatorio"),

  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Ingresa 16 números")
    .required("El número de tarjeta es obligatorio"),

  expiration: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Usa el formato MM/AA"
    )
    .test("future-date", "La fecha debe ser futura", (value) => {
      if (!value || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
        return false;
      }

      const [month, year] = value.split("/").map(Number);
      const now = new Date();
      const fullYear = 2000 + year;

      return (
        fullYear > now.getFullYear() ||
        (fullYear === now.getFullYear() &&
          month >= now.getMonth() + 1)
      );
    })
    .required("La fecha es obligatoria"),

  cvv: Yup.string()
    .matches(/^\d{3,4}$/, "Ingresa 3 o 4 números")
    .required("El código es obligatorio")
});

function Checkout() {
  const navigate = useNavigate();
  const { cart, total, completePurchase } = useStore();

  if (cart.length === 0) {
    return (
      <main className="page">
        <h1>Tu carrito está vacío</h1>
        <p>Agrega videojuegos antes de continuar.</p>
        <Link to="/cart" className="game-button">
          Volver al carrito
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout-container">
      <h1>
        <CreditCard size={30} />
        Finalizar compra
      </h1>

      <p className="checkout-warning">
        Esta es una simulación académica.
        No ingreses datos reales de tarjetas bancarias.
      </p>

      <div className="checkout-layout">
        <div className="checkout-form">
          <h2>Datos de compra simulada</h2>

          <Formik
            initialValues={{
              name: "",
              email: "",
              cardNumber: "",
              expiration: "",
              cvv: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(_, { setSubmitting }) => {
              completePurchase();
              setSubmitting(false);
              navigate("/library", {
                state: { purchaseSuccess: true }
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <label htmlFor="name">Nombre completo</label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Nombre del comprador"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="form-error"
                />

                <label htmlFor="email">Correo electrónico</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="form-error"
                />

                <label htmlFor="cardNumber">
                  Número de tarjeta ficticia
                </label>
                <Field
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="4242424242424242"
                  maxLength={16}
                  autoComplete="off"
                />
                <ErrorMessage
                  name="cardNumber"
                  component="div"
                  className="form-error"
                />

                <div className="form-row">
                  <div>
                    <label htmlFor="expiration">
                      Vencimiento ficticio
                    </label>
                    <Field
                      id="expiration"
                      name="expiration"
                      placeholder="12/29"
                      maxLength={5}
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="expiration"
                      component="div"
                      className="form-error"
                    />
                  </div>

                  <div>
                    <label htmlFor="cvv">
                      CVV ficticio
                    </label>
                    <Field
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      maxLength={4}
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="cvv"
                      component="div"
                      className="form-error"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="checkout-button"
                  disabled={isSubmitting}
                >
                  <ShieldCheck size={20} />
                  Confirmar compra simulada
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <aside className="cart-summary">
          <h2>Resumen de compra</h2>

          {cart.map((game) => (
            <div className="checkout-game" key={game.id}>
              <span>{game.title}</span>
              <strong>
                S/ {Number(game.price).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="cart-total">
            <span>Total</span>
            <strong>S/ {total.toFixed(2)}</strong>
          </div>

          <p className="cart-note">
            No se realizará ningún cargo real.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
