import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { InventoryService } from '../service/inventory.service';
import { Inventory } from '../entities/inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async getInventory(): Promise<Inventory[]> {
    return await this.inventoryService.getInventory();
  }

  @Post()
  async addInventory(@Body() inventory: Inventory): Promise<Inventory> {
    return await this.inventoryService.addInventory(inventory);
  }

  @Post(':id')
  async updateInventory(
    @Param('id') id: number,
    @Body() inventory: Inventory,
  ): Promise<Inventory> {
    return await this.inventoryService.updateInventory(id, inventory);
  }

  @Delete(':id')
  async removeInventory(@Param('id') id: number): Promise<void> {
    await this.inventoryService.removeInventory(id);
  }
}
