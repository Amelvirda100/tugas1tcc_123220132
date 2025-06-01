import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Kamar = db.define("kamar", {
  kamar_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  no_kamar: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  tipe_kamar: {
    type: DataTypes.ENUM("Ekonomi", "Standar", "VIP"),
    allowNull: false,
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Kosong", "Terisi"),
    defaultValue: "Kosong",
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

db.sync().then(() => console.log("Kamar model tersinkron"));

export default Kamar;
