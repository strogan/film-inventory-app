import axios from "axios";
import { ChangeEvent, SyntheticEvent, useState } from "react";

interface InventoryFormProps {
    fetchInventoryData: () => void
}

export default function InventoryForm({fetchInventoryData}: InventoryFormProps){

    const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

    
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/inventory', {
        name: itemName,
        quantity: parseInt(itemQuantity),
      });
      fetchInventoryData();
      setItemName('');
      setItemQuantity('');
    } catch (error) {
      console.error('Error adding inventory item:', error);
    }
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(event.target.value);
  };


    return <form onSubmit={handleSubmit} className="flex flex-col">
    <label className="flex flex-col">
      <span className="text-sm">Name:</span>
      <input type="text" value={itemName} onChange={handleChangeName} className="mt-1 p-2 border border-gray-300 rounded-md" />
    </label>
    <label className="flex flex-col">
      <span className="text-sm">Quantity:</span>
      <input type="number" value={itemQuantity} onChange={handleChangeQuantity} className="mt-1 p-2 border border-gray-300 rounded-md" />
    </label>
    <button type="submit" className="bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Add Inventory</button>
  </form>
}