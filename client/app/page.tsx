"use client";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import { ColDef, NewValueParams } from "ag-grid-community";
import ActionsRenderer from "./components/actionsRenderer";
import InventoryForm from "./components/inventoryForm";

export default function Home() {
  const [rowData, setRowData] = useState([{ name: "", quantity: 0 }]);
  const [rowTotal, setRowTotal] = useState(0);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/inventory");
      setRowData(response.data);
      setRowTotal(
        response.data.reduce((total, row) => total + row.quantity, 0)
      );
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const colDefs: ColDef[] = [
    {
      field: "name",
      editable: true,
      cellEditor: "agTextCellEditor",
      cellEditorParams: { maxLength: 20 },
    },
    {
      field: "quantity",
      editable: true,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: { min: 0, max: 10000 },
    },
    {
      field: "actions",
      cellRenderer: ActionsRenderer,
      cellRendererParams: { fetchInventoryData },
    },
  ];

  const handleCellChange = async (event: NewValueParams) => {
    const { id, name, quantity } = event.data;
    try {
      await axios.post(`http://localhost:3001/inventory/${id}`, {
        name,
        quantity,
      });
      fetchInventoryData();
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  return (
    <main className="flex flex-col items-center space-y-4 p-10">
      <h1>Film Inventory</h1>
      <InventoryForm fetchInventoryData={fetchInventoryData} />
      <div className="ag-theme-quartz" style={{ height: 300, width: 610 }}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          onCellValueChanged={handleCellChange}
          frameworkComponents={{ ActionsRenderer }}
          pinnedBottomRowData={[{ name: "Grand Total", quantity: rowTotal }]}
        />
      </div>
    </main>
  );
}
