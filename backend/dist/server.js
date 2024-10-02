"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const blogpostroutes_1 = __importDefault(require("./routes/blogpostroutes"));
const tagroutes_1 = __importDefault(require("./routes/tagroutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'https://rinkakuworks.com/blogging-platform',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
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
app.use('/auth', auth_1.default);
app.use('/api', blogpostroutes_1.default);
app.use('/tags', tagroutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello, Typescript + Node.js + Express!');
});
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
