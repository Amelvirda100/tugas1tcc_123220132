import DaftarSewa from "../models/daftarSewa_model.js";
import Penyewa from "../models/penyewa_model.js";
import Kamar from "../models/kamar_model.js";

// GET semua atau berdasarkan id
async function getDaftarSewa(req, res) {
  const { id } = req.params;

  try {
    if (id) {
      const sewa = await DaftarSewa.findByPk(id, {
        include: [Penyewa, Kamar]
      });
      if (!sewa) return res.status(404).json({ message: "Data sewa tidak ditemukan" });
      return res.status(200).json(sewa);
    }

    const daftar = await DaftarSewa.findAll({ include: [Penyewa, Kamar] });
    res.status(200).json(daftar);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
}

// CREATE
async function createDaftarSewa(req, res) {
  try {
    const result = await DaftarSewa.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// UPDATE
async function updateDaftarSewa(req, res) {
  try {
    const { id } = req.params;
    const sewa = await DaftarSewa.findByPk(id);
    if (!sewa) return res.status(404).json({ msg: "Data sewa tidak ditemukan" });

    await DaftarSewa.update(req.body, { where: { id_sewa: id } });
    return res.status(200).json({ msg: "Data sewa berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// DELETE
async function deleteDaftarSewa(req, res) {
  try {
    const { id } = req.params;
    const sewa = await DaftarSewa.findByPk(id);
    if (!sewa) return res.status(404).json({ msg: "Data sewa tidak ditemukan" });

    await DaftarSewa.destroy({ where: { id_sewa: id } });
    return res.status(200).json({ msg: "Data sewa berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export { getDaftarSewa, createDaftarSewa, updateDaftarSewa, deleteDaftarSewa };
