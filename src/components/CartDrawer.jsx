const CartDrawer = ({ isOpen, cartItems, onClose, onIncrease, onDecrease, onRemove }) => {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        role="presentation"
      />

      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div>
            <h2>Your Cart</h2>
            <p>{cartItems.length} item{cartItems.length === 1 ? '' : 's'}</p>
          </div>
          <button type="button" className="cart-drawer-close" onClick={onClose}>
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <span>Add a product to see it here.</span>
          </div>
        ) : (
          <div className="cart-drawer-items">
            {cartItems.map((item) => (
              <div className="cart-drawer-item" key={item.id}>
                <div className="cart-drawer-item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)} each</p>
                </div>

                <div className="cart-drawer-controls">
                  <button type="button" onClick={() => onDecrease(item.id)}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => onIncrease(item.id)}>
                    +
                  </button>
                </div>

                <div className="cart-drawer-item-footer">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  <button type="button" className="cart-drawer-remove" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-drawer-footer">
          <div className="cart-drawer-total">
            <span>Total</span>
            <strong>${totalAmount.toFixed(2)}</strong>
          </div>
          <button type="button" className="cart-drawer-checkout">
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
