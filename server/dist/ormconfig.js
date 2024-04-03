"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
exports.typeOrmConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'newuser',
    password: 'admin',
    database: 'filmmakers',
    entities: ["dist/**/*.entity.js"],
    synchronize: true,
};
//# sourceMappingURL=ormconfig.js.map