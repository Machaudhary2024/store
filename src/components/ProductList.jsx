import { useState,useEffect } from 'react';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';
import CartDrawer from './CartDrawer';

const ProductList = () => {
  // Sample product data
  const [products,setProducts] = useState([ ]);
  useEffect(() => {
  fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
      const formattedProducts = data.products.map(product => ({
        id: product.id,
        name: product.title,        
        category: product.category,
        price: product.price,
        description: product.description,
        image: product.thumbnail    
      }));
      setProducts(formattedProducts);
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });
}, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const increaseQuantity = (id) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCartItems(prevItems => prevItems.flatMap(item => {
      if (item.id !== id) return [item];
      if (item.quantity === 1) return [];
      return [{ ...item, quantity: item.quantity - 1 }];
    }));
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="products-container">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="products-main">
        <div className="products-header">
          <div>
            <h1>Our Products</h1>
            <p>Showing {filteredProducts.length} of {products.length} products</p>
          </div>
          <button className="cart-button" type="button" onClick={() => setIsCartOpen(true)}>
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            <span className="cart-count">{cartItems.reduce((count, item) => count + item.quantity, 0)}</span>
          </button>
        </div>
        
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default ProductList;
