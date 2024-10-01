"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Tags extends sequelize_1.Model {
}
exports.Tags = Tags;
Tags.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'tags',
    timestamps: false,
});
