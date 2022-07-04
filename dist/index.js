"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)({
    path: (0, path_1.resolve)(__dirname, "../.env"),
});
const app = (0, express_1.default)();
const port = process.env.PORT || 8080; // default port to listen
const endpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json";
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.get("/:query", (req, res) => {
    const { query } = req.params;
    // res.send(`Hello ${query}`);
    const url = `${endpoint}?query=${query}&key=${process.env.API_KEY}`;
    (0, node_fetch_1.default)(url)
        .then((response) => response.json())
        .then((json) => {
        res.json(json);
    });
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map