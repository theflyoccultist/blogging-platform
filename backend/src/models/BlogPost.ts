import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

interface BlogPostAttributes {
    id?: number;
    title: string;
    thumbnail: string;
    content: string;
    author: string;
    publishedAt: Date;
}

class BlogPost extends Model<BlogPostAttributes> implements BlogPostAttributes {
    public id!: number;
    public title!: string;
    public thumbnail!: string;
    public content!: string;
    public author!: string;
    public publishedAt!: Date;
}

BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publishedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, 
        {   
            sequelize,
            tableName: 'blogposts',
            timestamps: true,
        }
);

export { BlogPost }