"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const serve_static_1 = __importDefault(require("serve-static"));
const app = (0, express_1.default)();
const port = 5000;
// CORS Middleware
app.use((0, cors_1.default)()); // This will allow requests from all origins by default
// Middleware to serve static files from the uploads folder
app.use('/uploads', (0, serve_static_1.default)(path_1.default.join(__dirname, '../uploads')));
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api', imageRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
