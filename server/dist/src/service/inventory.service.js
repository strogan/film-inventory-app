"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_entity_1 = require("../entities/inventory.entity");
let InventoryService = class InventoryService {
    constructor(inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    async getInventory() {
        return await this.inventoryRepository.find();
    }
    async addInventory(inventory) {
        const newInventory = this.inventoryRepository.create(inventory);
        return await this.inventoryRepository.save(newInventory);
    }
    async updateInventory(id, inventory) {
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
    async removeInventory(id) {
        await this.inventoryRepository.delete(id);
    }
    async addInitialItems() {
        const initialItems = [
            { name: 'camera', quantity: 10 },
            { name: 'videocamera', quantity: 20 },
            { name: 'nothing', quantity: 0 },
        ];
        await this.inventoryRepository.save(initialItems.map((item) => this.inventoryRepository.create(item)));
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map