import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost', // Replace with your MySQL host
  port: 3306, // Replace with your MySQL port (default)
  username: 'newuser', // Replace with your MySQL username
  password: 'admin', // Replace with your MySQL password
  database: 'filmmakers', // Replace with your database name
  entities: ["dist/**/*.entity.js"], // Path to your entities
  synchronize: true, // Set to false in production for migrations
};
