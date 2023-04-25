import * as dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;
