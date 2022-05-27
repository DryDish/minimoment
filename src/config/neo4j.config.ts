import Neode from "neode";

// Constants
const PROTOCOL = process.env.NEO4J_DB_PROTOCOL || "neo4j";
const HOST = process.env.NEO4J_DB_HOST || "localhost";
const USER = process.env.NEO4J_DB_USER || "neo4j";
const PASSWORD = process.env.NEO4J_DB_PASSWORD || "";
const DATABASE = process.env.NEO4J_DB_DATABASE || "neo4j";

export const instance = new Neode(`${PROTOCOL}://${HOST}:7687`, USER, PASSWORD, false, DATABASE);

import { Role } from "../models/neo4j/role";

(async () => {
  const newRole = await Role.create({ name: "lmao" });

  console.log(newRole);

  console.log(await Role.all());
})();
