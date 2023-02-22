"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('rrhh', 'root', 'Camila23*', {
    host: "34.28.92.71",
    dialect: 'mysql',
});
exports.default = sequelize;
