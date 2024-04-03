import { InventoryService } from '../service/inventory.service';
import { Inventory } from '../entities/inventory.entity';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getInventory(): Promise<Inventory[]>;
    addInventory(inventory: Inventory): Promise<Inventory>;
    updateInventory(id: number, inventory: Inventory): Promise<Inventory>;
    removeInventory(id: number): Promise<void>;
}
