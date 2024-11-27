import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Users } from "./Users";

class RefreshToken extends Model {
    public id!: number;
    public token! : string;
    public userId!: number;
    public expiresAt! : Date;
}

RefreshToken.init(
    {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    { sequelize, tableName: 'refresh_token' }
);

RefreshToken.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE" });
Users.hasMany(RefreshToken, {foreignKey: "userId" })

export default RefreshToken;