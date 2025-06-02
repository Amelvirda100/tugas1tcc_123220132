import DaftarSewa from "../models/daftarSewa_model.js";
import Penyewa from "../models/penyewa_model.js";
import Kamar from "../models/kamar_model.js";

/// Ambil semua daftar sewa
export const getAllSewa = async (req, res) => {
  try {
    const data = await DaftarSewa.findAll({
      include: [
        { model: Penyewa, attributes: ['id_penyewa', 'nama'] }, // contoh atribut tambahan
        { model: Kamar, attributes: ['kamar_id', 'no_kamar'] }
      ],
      order: [['id_sewa', 'ASC']]
    });

    // Debug isi relasi Penyewa dan Kamar untuk item pertama
    if (data.length > 0) {
      console.log("Keys of item 0:", Object.keys(data[0].dataValues));
      console.log("Raw full data:", JSON.stringify(data[0], null, 2));

    }

    // Ubah properti agar frontend sesuai (optional)
      const hasil = data.map(item => ({
        id_sewa: item.id_sewa,
        id_penyewa: item.id_penyewa,
        kamar_id: item.kamar_id,
        tgl_mulai: item.tgl_mulai,
        tgl_selesai: item.tgl_selesai,
        status_sewa: item.status_sewa,
        nama: item.penyewa?.nama,
        no_kamar: item.kamar?.no_kamar || item.Kamar?.no_kamar
      }));


    res.json(hasil);
  } catch (error) {
    console.log(error); // untuk melihat hasil raw dari Sequelize
    res.status(500).json({ message: error.message });
  }
};



// Ambil data sewa berdasarkan ID
export const getSewabyId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await DaftarSewa.findOne({
      where: { id_sewa: id },
      include: [
        { model: Penyewa, attributes: ['id_penyewa', 'nama'] },
        { model: Kamar, attributes: ['kamar_id', 'no_kamar'] }
      ]
    });
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    // Ubah properti untuk frontend
    const hasil = {
      id_sewa: data.id_sewa,
      id_penyewa: data.id_penyewa,
      kamar_id: data.kamar_id,
      tgl_mulai: data.tgl_mulai,
      tgl_selesai: data.tgl_selesai,
      status_sewa: data.status_sewa,
      nama: data.penyewa.nama,
      no_kamar: data.kamar.no_kamar
    };

    res.json(hasil);
  } catch (error) {
    console.log(error); // untuk melihat hasil raw dari Sequelize
    res.status(500).json({ message: error.message });
  }
};

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

export const selesaiSewa = async (req, res) => {
  try {
    const { id } = req.params;
    const sewa = await DaftarSewa.findByPk(id);
    if (!sewa) return res.status(404).json({ msg: "Data sewa tidak ditemukan" });

    if (sewa.status_sewa !== "Aktif") {
      return res.status(400).json({ msg: "Sewa harus dalam status Aktif untuk diselesaikan" });
    }

    // Update status sewa jadi 'Selesai' dan tgl_selesai hari ini
    await DaftarSewa.update(
      {
        status_sewa: "Selesai",
        tgl_selesai: new Date().toISOString().split("T")[0],
      },
      { where: { id_sewa: id } }
    );

    // Update status kamar jadi 'Kosong'
    await Kamar.update(
      { status: "Kosong" },
      { where: { kamar_id: sewa.kamar_id } }
    );

    res.json({ msg: "Sewa berhasil diselesaikan dan kamar diupdate ke Kosong" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const batalkanSewa = async (req, res) => {
  try {
    const { id } = req.params;
    const sewa = await DaftarSewa.findByPk(id);
    if (!sewa) return res.status(404).json({ msg: "Data sewa tidak ditemukan" });

    if (sewa.status_sewa !== "Aktif") {
      return res.status(400).json({ msg: "Sewa harus dalam status Aktif untuk dibatalkan" });
    }

    // Update status sewa jadi 'Dibatalkan'
    await DaftarSewa.update(
      {
        status_sewa: "Dibatalkan",
        tgl_selesai: null, // biasanya tanggal selesai dihapus saat batal
      },
      { where: { id_sewa: id } }
    );

    // Update status kamar jadi 'Kosong'
    await Kamar.update(
      { status: "Kosong" },
      { where: { kamar_id: sewa.kamar_id } }
    );

    res.json({ msg: "Sewa berhasil dibatalkan dan kamar diupdate ke Kosong" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export {createDaftarSewa, updateDaftarSewa, deleteDaftarSewa };