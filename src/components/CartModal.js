import React from 'react';
import { useCart } from '../Context/CartContext'; 
import { Modal, Button } from 'react-bootstrap';

const CartModal = ({ show, handleClose }) => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart(); 

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="row border-bottom py-2">
                <div className="col-2">
                  <img className="img-fluid" src={item.image} alt={item.title} />
                </div>
                <div className="col">
                  <div className="row text-muted">{item.category}</div>
                  <div className="row">{item.title}</div>
                </div>
                <div className="col">
                  ${calculateSubtotal(item)} 
                </div>
                <div className="col">
                  <div className="input-group">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
                
                <div className="col">
                  <button className="btn btn-outline-danger" onClick={() => removeFromCart(item.id)}>&#10005;</button>
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col">
                <button className="btn btn-outline-danger mt-4" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
