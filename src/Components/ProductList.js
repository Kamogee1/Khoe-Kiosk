// ProductList.js
import React, { useState, useEffect } from 'react';
import AddProductForm from './AddProductForm'; // Imported the AddProductForm 


const ProductList = ({ userRole }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setShowAddForm(false);
    fetchProducts(); // Refresh after adding
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-primaryBlue mb-6 text-center">Product List</h2>

      {loading && <div className="text-primaryBlue">Loading products...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {userRole === 'admin' && !showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-primaryBlue text-white py-2 px-4 rounded hover:bg-secondaryBlue transition duration-200 mb-6 block mx-auto"
        >
          Add Product
        </button>
      )}

      {showAddForm && (
        <div className="mb-6">
          <AddProductForm onAddProduct={handleAddProduct} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-lightBlue rounded-lg p-4 bg-white shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold text-primaryBlue">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            <p className="text-base text-green-600 font-bold mt-2">R{product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;