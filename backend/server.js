import { createServer } from "http";
import app from "./app.js";

const server = createServer(app);

export default server;
