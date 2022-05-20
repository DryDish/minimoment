import mongoose from "mongoose";
import { populate } from "../utils/mongo-model-loader.utils";

// Constants
const HOST = process.env.MONGO_DB_HOST || "localhost";
const USER = process.env.MONGO_DB_USER || "";
const PASSWORD = process.env.MONGO_DB_PASSWORD || "";
const DATABASE = process.env.MONGO_DB_DATABASE || "";
const AUTH_DATABASE = process.env.MONGO_DB_AUTH_DATABASE || "";

// Connect to the db
mongoose.connect(
  `mongodb://${USER}:${PASSWORD}@${HOST}:27017/${DATABASE}?authSource=${AUTH_DATABASE}`
);
