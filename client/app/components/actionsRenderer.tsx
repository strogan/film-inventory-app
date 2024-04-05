import axios from "axios";
interface ActionsRendererProps {
  data: any;
  fetchInventoryData: () => void;
}

export default function ActionsRenderer({
  data,
  fetchInventoryData,
}: ActionsRendererProps) {
  const handleDelete = async () => {
    const id = data.id;
    try {
      await axios.delete(`http://localhost:3001/inventory/${id}`);
      fetchInventoryData();
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };

  if (data.name !== "Grand Total")
    return <button onClick={handleDelete}>Delete</button>;
}
