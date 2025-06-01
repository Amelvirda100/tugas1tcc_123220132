import Penyewa from "../models/penyewa_model.js";

// GET (ambil semua atau by id)
async function getPenyewa(req, res) {
  const { id } = req.params;

  try {
    if (id) {
      const penyewa = await Penyewa.findByPk(id);
      if (!penyewa) return res.status(404).json({ message: "Penyewa tidak ditemukan" });
      return res.status(200).json(penyewa);
    }

    const penyewas = await Penyewa.findAll();
    res.status(200).json(penyewas);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
}

// CREATE
async function createPenyewa(req, res) {
  try {
    const result = await Penyewa.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// UPDATE
async function updatePenyewa(req, res) {
  try {
    const { id } = req.params;
    const penyewa = await Penyewa.findByPk(id);
    if (!penyewa) return res.status(404).json({ msg: "Penyewa tidak ditemukan" });

    await Penyewa.update(req.body, { where: { id_penyewa: id } });
    return res.status(200).json({ msg: "Penyewa berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

// DELETE
async function deletePenyewa(req, res) {
  try {
    const { id } = req.params;
    const penyewa = await Penyewa.findByPk(id);
    if (!penyewa) return res.status(404).json({ msg: "Penyewa tidak ditemukan" });

    await Penyewa.destroy({ where: { id_penyewa: id } });
    return res.status(200).json({ msg: "Penyewa berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export { getPenyewa, createPenyewa, updatePenyewa, deletePenyewa };
