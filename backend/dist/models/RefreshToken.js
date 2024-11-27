"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Users_1 = require("./Users");
class RefreshToken extends sequelize_1.Model {
}
RefreshToken.init({
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    expiresAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, { sequelize: database_1.sequelize, tableName: 'refresh_token' });
RefreshToken.belongsTo(Users_1.Users, { foreignKey: "userId", onDelete: "CASCADE" });
Users_1.Users.hasMany(RefreshToken, { foreignKey: "userId" });
exports.default = RefreshToken;
