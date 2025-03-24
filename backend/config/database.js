import { Sequelize } from "sequelize";

const db = new Sequelize("tugas_notes", "root", "123220132", {
  host: "34.41.167.130",
  dialect: "mysql",
});

export default db;
