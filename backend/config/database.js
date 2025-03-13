import { Sequelize } from "sequelize";

const db = new Sequelize("tugas_notes", "root", "123220132", {
  host: "34.172.234.183",
  dialect: "mysql",
});

export default db;
