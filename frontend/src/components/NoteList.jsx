import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  // Bikin authHeader langsung di sini
  const authHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/notes", authHeader());
      setNotes(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.error(error);
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`, authHeader());
      getNotes();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus catatan");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout", {
        ...authHeader(),
        withCredentials: true,
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      alert("Logout gagal");
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <div className="is-flex is-justify-content-space-between mb-4">
          <Link to="/notes/add" className="button is-primary is-light">
            ➕ Tambah Catatan
          </Link>
          <Link to="/dashboard" className="button is-link is-light">
            👥 Daftar User
          </Link>
          <button onClick={handleLogout} className="button is-danger is-light">
            🚪 Logout
          </button>
        </div>

        <table className="table is-striped is-fullwidth" style={{ borderRadius: "12px", backgroundColor: "#fff1f7" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Isi</th>
              <th>Penulis</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={note.id}>
                <td>{index + 1}</td>
                <td>{note.judul || note.title}</td>
                <td>{note.isi || note.content}</td>
                <td>{note.penulis || note.author || "–"}</td>
                <td className="is-flex gap-1">
                  <Link to={`/edit/${note.id}`} className="button is-small is-info is-light" style={{ borderRadius: "12px" }}>
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="button is-small is-danger is-light"
                    style={{ borderRadius: "12px" }}
                  >
                    🗑️ Hapus
                  </button>
                </td>
              </tr>
            ))}
            {notes.length === 0 && (
              <tr>
                <td colSpan={5} className="has-text-centered">
                  Tidak ada catatan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoteList;
