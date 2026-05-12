import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../config/api";
import "../styles/cartDrawer.css";

function CartDrawer() {
  const { items, total, isOpen, closeCart, removeFromCart, updateQuantity, loading } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="cart_overlay" onClick={closeCart} />}

      {/* Drawer */}
      <div className={`cart_drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart_drawer_header">
          <h3>Your Cart</h3>
          <button className="cart_close_btn" onClick={closeCart}>✕</button>
        </div>

        {/* Items */}
        <div className="cart_drawer_items">
          {loading && <p className="cart_empty">Loading...</p>}

          {!loading && items.length === 0 && (
            <p className="cart_empty">Your cart is empty.</p>
          )}

          {!loading && items.map((item) => (
            <div key={item.id ?? `${item.product_id}_${item.variant_id}`} className="cart_item">
              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className="cart_item_img"
              />
              <div className="cart_item_info">
                <p className="cart_item_name">{item.name}</p>
                {item.variant_label && (
                  <p className="cart_item_variant">{item.variant_label}</p>
                )}
                <p className="cart_item_price">
                  {item.quantity} × {Number(item.unit_price).toFixed(2)} MAD
                </p>
                {/* Quantity controls */}
                <div className="cart_item_qty">
                  <button
                    onClick={() =>
                      item.quantity > 1
                        ? updateQuantity(item.id ?? item._key, item.quantity - 1)
                        : removeFromCart(item.id ?? item._key)
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id ?? item._key, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="cart_item_remove"
                onClick={() => removeFromCart(item.id ?? item._key)}
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart_drawer_footer">
            <div className="cart_subtotal">
              <span>Subtotal:</span>
              <span>{Number(total).toFixed(2)} MAD</span>
            </div>
            <button
              className="cart_view_btn"
              onClick={() => { closeCart(); navigate("/cart"); }}
            >
              VIEW CART
            </button>
            <button
              className="cart_checkout_btn"
              onClick={() => { closeCart(); navigate("/checkout"); }}
            >
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
