"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth_1 = __importDefault(require("./routes/auth"));
const blogpostroutes_1 = __importDefault(require("./routes/blogpostroutes"));
const tagroutes_1 = __importDefault(require("./routes/tagroutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://www.blogging-platform.rinkakuworks.com/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express_1.default.json());
database_1.sequelize.authenticate()
    .then(() => {
    console.log('Database connected...');
    return database_1.sequelize.sync();
})
    .then(() => {
    console.log('Sequelize models synced successfully');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
app.use('/backend/auth', auth_1.default);
app.use('/backend/api', blogpostroutes_1.default);
app.use('/backend/tags', tagroutes_1.default);
app.get('/backend', (req, res) => {
    res.send('Hello from backend route!');
});
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
