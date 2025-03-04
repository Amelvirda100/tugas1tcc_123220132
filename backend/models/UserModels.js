import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Note = db.define('notes', {
  judul: DataTypes.STRING,
  isi: DataTypes.TEXT,
  penulis: DataTypes.STRING
}, {
  timestamps: true,
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada'
});

db.sync().then(() => console.log("Database tersinkron"));

export default Note;