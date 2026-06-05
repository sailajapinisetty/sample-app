import React, { useState } from "react";
import "./app.css";
import i1 from "/src/asset/i1.jpg";
import i2 from "/src/asset/i2.jpg";
import i3 from "/src/asset/i3.jpg";
import i4 from "/src/asset/i4.jpg";
import i5 from "/src/asset/i5.jpg";
import i6 from "/src/asset/i6.jpg";




const PRODUCTS = [
  { id: 1, name: "iPhone 15", image: i1, price: 999 },
  { id: 2, name: "Samsung S23", image: i2, price: 899 },
  { id: 3, name: "MacBook Pro", image: i3, price: 1999 },
  { id: 4, name: "AirPods", image: i4, price: 199 },
  { id: 5, name: "Apple Watch", image: i5, price: 399 },
  { id: 6, name: "Google Pixel 7", image: i6, price: 799 },
  { id: 7, name: "Dell XPS 13", image: i1, price: 1299 },
  { id: 8, name: "Sony WH-1000XM4", image: i2, price: 349 },
];

export default function App() {
  const [page, setPage] = useState("products");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

   const addToCart = (product) => {
    setCart([...cart, product]);

    setMessage(`${product.name} added to cart ✅`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    setMessage(`Item removed from cart ❌`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  const checkoutCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    setMessage(`No items in cart ❌`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const [message, setMessage] = useState("");

 const Checkoutform = () => {
  // Simulate checkout process
  setTimeout(() => {
    setMessage("Order placed successfully ✅");
    setCart([]);
    setPage("products");
  }, 1000);
};

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Marketplace</h2>
        <div>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")} title={`Cart (${cart.length})`}>
            Cart ({cart.length})
          </button>
          {message && <div className="toast">{message}</div>}
          <button onClick={() => setPage("checkout")}>Checkout</button>
        </div>
      </nav>

      {/* PRODUCTS PAGE */}
      {page === "products" && (
        <div className="container">
          <h2>Products</h2>

          <input
            className="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="grid">
            {filteredProducts.map((product) => (
              <div className="card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                
                <p>${product.price}</p>
                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CART PAGE */}
      {page === "cart" && (
        <div className="container">
          <h2>Cart</h2>

          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
              
                <span>
                   <img src={item.image} alt={item.name} className="img" /> {item.name} - ${item.price}
                </span>
                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* CHECKOUT PAGE */}
      {page === "checkout" && (
          cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
        <div className="container" >
          <h2>Checkout</h2>
          
          {cart.map((item) => (
            <div className="checkout-item" key={item.id}>
            <p key={item.id}>
              <img src={item.image} alt={item.name} className="img" /> {item.name} - ${item.price}
            </p>
            </div>
          ))}

          <h3>Total: ${total}</h3>

          <button
            className="checkout-btn"
            
            onClick={() => {Checkoutform();
            

              setCart([]);
              setPage("products");
            }}
          >
            Place Order
          </button>
        </div>
      ))}
    </div>
  );
}