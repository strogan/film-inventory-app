import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
export declare class InventoryService {
    private readonly inventoryRepository;
    constructor(inventoryRepository: Repository<Inventory>);
    getInventory(): Promise<Inventory[]>;
    addInventory(inventory: Inventory): Promise<Inventory>;
    updateInventory(id: number, inventory: Inventory): Promise<Inventory>;
    removeInventory(id: number): Promise<void>;
    addInitialItems(): Promise<void>;
}
