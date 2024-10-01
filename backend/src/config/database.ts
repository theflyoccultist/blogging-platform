import  { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: 'postgres',
        port: Number(process.env.DB_PORT) || 5432,
        logging: false,
    }
);

export { sequelize };