import Note from "../models/UserModels.js";

// GET (Ngambil Data)
// GET (Ngambil Semua Data atau Berdasarkan ID)
async function getNotes(req, res) {
  const { id } = req.params;

  try {
    if (id) {
      const note = await Note.findByPk(id);

      if (!note) {
        return res.status(404).json({ message: "Catatan tidak ditemukan" });
      }

      return res.status(200).json(note);
    }

    // Kalau nggak ada id, ambil semua catatan
    const notes = await Note.findAll();
    res.status(200).json(notes);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
}


// POST (Membuat Data)
async function createNote(req, res) {
  console.log('Tipe data body:', typeof req.body); // Debug tipe data
  console.log('Isi body:', req.body); // Debug isi body

  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Data tidak lengkap atau format salah' });
  }

  try {
    const newNote = await Note.create({
      judul: title,     // Sesuai nama kolom di database
      isi: content,     // Sesuai nama kolom di database
      penulis: author   // Sesuai nama kolom di database
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.log('Error saat membuat catatan:', error.message);
    res.status(500).json({ error: error.message });
  }
}


// PUT (Update Data)
async function updateNote(req, res) {
  try {
    console.log('ID yang diterima:', req.params.id); // Cek id dari request
    console.log('Data yang diterima:', req.body); // Cek data yang diterima backend

    const { id } = req.params;
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ message: "Catatan tidak ditemukan" });
    }

    await Note.update({
      judul: req.body.title,
      isi: req.body.content,
      penulis: req.body.author
    }, { where: { id } });
    res.status(200).json({ message: "Catatan berhasil diperbarui" });
  } catch (error) {
    console.log(error.message);
  }
}

// DELETE (Menghapus Data)
async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ message: "Catatan tidak ditemukan" });
    }

    await Note.destroy({ where: { id } });
    res.status(200).json({ message: "Catatan berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
  }
}

export { getNotes, createNote, updateNote, deleteNote };