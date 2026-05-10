import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { STORAGE_URL } from "../config/api";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/GreenFooter.jsx";
import "../styles/cart.css";

function Cart() {
  const { items, total, loading, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="cart_page_empty">
          <p>Please <span onClick={() => navigate("/login")} className="cart_login_link">log in</span> to view your cart.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="page_content" style={{height: '100vh'}} >
        <div className="cart_page">
        <h1 className="cart_page_title">Shopping Cart</h1>

        <div className="cart_page_layout">
          {/* Left — items table */}
          <div className="cart_table_wrapper">
            {loading ? (
              <p className="cart_page_loading">Loading...</p>
            ) : items.length === 0 ? (
              <p className="cart_page_loading">Your cart is empty.</p>
            ) : (
              <table className="cart_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id ?? `${item.product_id}_${item.variant_id}`}>
                      <td>
                        <button className="cart_remove_btn" onClick={() => removeFromCart(item.id ?? item._key)} title="Remove">✕</button>
                      </td>
                      <td>
                        <div className="cart_product_cell">
                          <img src={`${STORAGE_URL}/${item.image}`} alt={item.name} className="cart_product_img" />
                          <div>
                            <span className="cart_product_name">{item.name}</span>
                            {item.variant_label && (
                              <span className="cart_variant_label">{item.variant_label}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="cart_price">
                        {Number(item.unit_price).toFixed(2)}
                        <span> {item.currency} </span>
                      </td>
                      <td>
                        <div className="cart_qty_control">
                          <button onClick={() => item.quantity > 1 ? updateQuantity(item.id ?? item._key, item.quantity - 1) : removeFromCart(item.id ?? item._key)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id ?? item._key, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</button>
                        </div>
                      </td>
                      <td className="cart_subtotal_cell">
                        {Number(item.subtotal).toFixed(2)}
                        <span> {item.currency} </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Right — cart totals */}
          {items.length > 0 && (
            <div className="cart_totals">
              <h2 className="cart_totals_title">Cart totals</h2>

              <div className="cart_totals_box">
                <div className="cart_totals_row">
                  <span>Subtotal</span>
                  <span>{Number(total).toFixed(2)} MAD</span>
                </div>

                <div className="cart_totals_divider" />

                <div className="cart_totals_row cart_totals_total">
                  <span>Total</span>
                  <span>{Number(total).toFixed(2)} MAD</span>
                </div>

                <button
                  className="cart_checkout_btn"
                  onClick={() => navigate("/checkout")}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
