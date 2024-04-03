import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'ormconfig';
import { Inventory } from './entities/inventory.entity';
import { InventoryController } from './controller/inventory.controller';
import { InventoryService } from './service/inventory.service';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Inventory])
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class AppModule {}
