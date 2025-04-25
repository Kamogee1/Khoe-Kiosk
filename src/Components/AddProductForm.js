// AddProductForm.js
import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState([]);

  const validateForm = () => {
    const errorMessages = [];
    if (!name || name.length > 100) errorMessages.push('Name is required and should be less than 100 characters.');
    if (!description || description.length > 500) errorMessages.push('Description is required and should be less than 500 characters.');
    if (!price || isNaN(Number(price)) || price <= 0) errorMessages.push('Price should be a valid number greater than 0.');
    if (!category) errorMessages.push('Category is required.');
    if (!image || !image.type.startsWith('image/')) errorMessages.push('Please upload a valid image file.');
    if (!Number.isInteger(Number(quantity)) || quantity < 0) errorMessages.push('Quantity must be a valid integer greater than or equal to 0.');
    return errorMessages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('quantity', quantity);
    formData.append('is_active', isActive);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      onAddProduct(); // Trigger the parent to refresh the product list
    } catch (error) {
      setErrors(['Failed to add product']);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-md rounded-lg">
      {errors.length > 0 && <div className="text-red-500 mb-4">{errors.join(', ')}</div>}
      <div>
        <label className="block text-primaryBlue font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-primaryBlue focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-primaryBlue font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-primaryBlue focus:outline-none"
        ></textarea>
      </div>
      <div>
        <label className="block text-primaryBlue font-medium">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-primaryBlue focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-primaryBlue font-medium">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-primaryBlue focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-primaryBlue font-medium">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-primaryBlue focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-primaryBlue font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-primaryBlue focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-primaryBlue font-medium">Active</label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
          className="w-4 h-4 text-primaryBlue"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-primaryBlue text-white font-semibold rounded-md hover:bg-secondaryBlue transition duration-200"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;