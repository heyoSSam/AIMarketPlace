import React, { useState } from 'react';
import {Button} from '@/components/ui/button';
interface FormData {
  name: string;
  description: string;
  price: number;
}

const ListingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Listing Submitted:', formData);
    // You can replace this with your actual submit logic (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-black rounded shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4">List Your AI</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          AI Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          AI Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price (in ETH)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded"
          step="0.01" // Allows decimals for ETH
          min="0"
        />
      </div>

      <div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-400 via-pink-500 
                    to-red-500 text-white font-bold py-2 px-4 
                    rounded shadow-lg hover:shadow-xl transition duration-300"
        >
          List AI
        </Button>
      </div>
    </form>
  );
};

export default ListingForm;
