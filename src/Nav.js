import React, { useState } from 'react';
import './nav.css';
import cart from './cart.svg'; // Import the cart logo image

const Nav = () => {
  const [totalQuantity, setTotalQuantity] = useState(4);

  // Function to handle increasing quantity
  const handleIncreaseQuantity = () => {
    // Update total quantity state
    setTotalQuantity(totalQuantity + 1);
  };

  // Define state for cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Samsung Galaxy S8', price: 399.99, quantity: 1 },
    { id: 2, name: 'Google Pixel', price: 499.99, quantity: 1 },
    { id: 3, name: 'Xiaomi Redmi Note 2', price: 699.99, quantity: 1 },
    { id: 4, name: 'Samsung Galaxy S7', price: 599.99, quantity: 1 }
  ]);

  // Function to increment the quantity of an item in the cart
  const incrementQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    setTotalQuantity(totalQuantity + 1); // Increase total quantity
  };

  // Function to decrement the quantity of an item in the cart
  const decrementQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    setTotalQuantity(totalQuantity - 1); // Decrease total quantity
  };

  // Function to remove an item from the cart
  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    setTotalQuantity(totalQuantity - 1); // Decrease total quantity
  };

  // Calculate total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
    setTotalQuantity(0); // Reset total quantity
  };

  return (
    <main>
      <div className='navbar'>
        <div className='navContainer'>
          <h4>UseReducer</h4>
          <div className='cartContainer'>
            <img src={cart} alt='Cart' style={{ fontSize: '2.25rem' }} />
            <div className="amount-container">
              <p className="total-amount">{totalQuantity}</p>
            </div>
          </div>
        </div>
      </div>
      <section className='maincontainer'>
        <header><h2>YOUR BAG</h2></header>
        <div>
          {cartItems.map(item => (
            <article key={item.id} className="cart-item">
              <img src={`https://www.course-api.com/images/cart/phone-${item.id}.png`} alt={item.name} />
              <div>
                <h5>{item.name}</h5>
                <span className="item-price">${item.price}</span>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>remove</button>
              </div>
              <div>
                <button className="amount-btn" onClick={() => decrementQuantity(item.id)}>-</button>
                <span className="amount">{item.quantity}</span>
                <button className="amount-btn" onClick={() => incrementQuantity(item.id)}>+</button>
              </div>
            </article>
          ))}
        </div>
        <footer>
          <hr />
          <div><h5 className="cart-total">Total <span>${totalPrice.toFixed(2)}</span></h5></div>
          <button className="btn btn-hipster" onClick={clearCart}>Clear Cart</button>
        </footer>
      </section>
    </main>
  );
}

export default Nav;