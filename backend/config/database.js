import { Sequelize } from "sequelize";

const db = new Sequelize("tugas_notes", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;