import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

interface TagAttribute {
    id?: number;
    name: string;
}

class Tags extends Model <TagAttribute> implements TagAttribute {
    public id!: number;
    public name!: string;
}

Tags.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            sequelize,
            tableName: 'tags',
            timestamps: false,
        }
)

export { Tags };