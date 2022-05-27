import Neode from "neode";

// Constants
const PROTOCOL = process.env.NEO4J_DB_PROTOCOL || "neo4j";
const HOST = process.env.NEO4J_DB_HOST || "localhost";
const USER = process.env.NEO4J_DB_USER || "neo4j";
const PASSWORD = process.env.NEO4J_DB_PASSWORD || "";
const DATABASE = process.env.NEO4J_DB_DATABASE || "neo4j";

export const instance = new Neode(
  `${PROTOCOL}://${HOST}:7687`,
  USER,
  PASSWORD,
  false,
  DATABASE
);

// Import models
import "../models/neo4j/role";
import "../models/neo4j/user";
import "../models/neo4j/subscription-type";
import "../models/neo4j/subscription";

const initiateSchema = async () => {
  try {
    await instance.schema.install();
  } catch (error) {
    console.error("Failed to install the schema...");
  }
};

initiateSchema();
