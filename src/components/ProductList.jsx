import { useState } from 'react';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';
import CartDrawer from './CartDrawer';

const ProductList = () => {
  // Sample product data
  const [products] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 79.99,
      description: 'High-quality wireless headphones with noise cancellation',
      image: 'https://via.placeholder.com/300x200/3498db/ffffff?text=Headphones'
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Electronics',
      price: 199.99,
      description: 'Feature-rich smartwatch with fitness tracking',
      image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=Smart+Watch'
    },
    {
      id: 3,
      name: 'Running Shoes',
      category: 'Sports',
      price: 89.99,
      description: 'Comfortable running shoes for daily training',
      image: 'https://via.placeholder.com/300x200/2ecc71/ffffff?text=Running+Shoes'
    },
    {
      id: 4,
      name: 'Yoga Mat',
      category: 'Sports',
      price: 29.99,
      description: 'Non-slip yoga mat for all types of exercises',
      image: 'https://via.placeholder.com/300x200/9b59b6/ffffff?text=Yoga+Mat'
    },
    {
      id: 5,
      name: 'Coffee Maker',
      category: 'Home',
      price: 59.99,
      description: 'Programmable coffee maker with thermal carafe',
      image: 'https://via.placeholder.com/300x200/f39c12/ffffff?text=Coffee+Maker'
    },
    {
      id: 6,
      name: 'Blender',
      category: 'Home',
      price: 49.99,
      description: 'Powerful blender for smoothies and more',
      image: 'https://via.placeholder.com/300x200/1abc9c/ffffff?text=Blender'
    },
    {
      id: 7,
      name: 'Backpack',
      category: 'Accessories',
      price: 45.99,
      description: 'Durable backpack with laptop compartment',
      image: 'https://via.placeholder.com/300x200/34495e/ffffff?text=Backpack'
    },
    {
      id: 8,
      name: 'Sunglasses',
      category: 'Accessories',
      price: 39.99,
      description: 'Stylish sunglasses with UV protection',
      image: 'https://via.placeholder.com/300x200/e67e22/ffffff?text=Sunglasses'
    }
  ]);

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
