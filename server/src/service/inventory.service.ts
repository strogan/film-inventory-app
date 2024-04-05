import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async getInventory(): Promise<Inventory[]> {
    return await this.inventoryRepository.find();
  }

  async addInventory(inventory: Inventory): Promise<Inventory> {
    const newInventory = this.inventoryRepository.create(inventory);
    return await this.inventoryRepository.save(newInventory);
  }

  async updateInventory(id: number, inventory: Inventory): Promise<Inventory> {
    const existingInventory = await this.inventoryRepository.findOne({
      where: { id },
    });
    if (!existingInventory) {
      throw new Error('Inventory item not found');
    }
    existingInventory.name = inventory.name;
    existingInventory.quantity = inventory.quantity;

    return await this.inventoryRepository.save(existingInventory);
  }

  async removeInventory(id: number): Promise<void> {
    await this.inventoryRepository.delete(id);
  }

  async addInitialItems(): Promise<void> {
    const initialItems = [
      { name: 'camera', quantity: 10 },
      { name: 'videocamera', quantity: 20 },
      { name: 'nothing', quantity: 0 },
    ];

    await this.inventoryRepository.save(
      initialItems.map((item) => this.inventoryRepository.create(item)),
    );
  }
}
