import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const authHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`https://backend-7-171192151600.us-central1.run.app/notes/${id}`, authHeader());
        console.log("Response data:", res.data); // cek apa yang sebenarnya diterima
        setTitle(res.data.judul);
        setContent(res.data.isi);
        setAuthor(res.data.penulis || "");
      } catch (error) {
        alert("Gagal memuat data catatan: " + error.message);
      }
    };
    fetchNote();
  }, [id]);


  const updateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://backend-7-171192151600.us-central1.run.app/notes/${id}`,
        { title, content, author },
        authHeader()
      );
      navigate("/notes");
    } catch (error) {
      alert("Gagal mengupdate catatan: " + error.message);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={updateNote} className="box has-background-primary-light" style={{ borderRadius: "12px" }}>
          <h1 className="title has-text-pink">Edit Note</h1>

          <div className="field">
            <label className="label has-text-pink">Judul</label>
            <div className="control">
              <input
                className="input is-primary is-light"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan Judul"
                required
                style={{ borderRadius: "12px" }}
              />
            </div>
          </div>

          <div className="field">
            <label className="label has-text-pink">Isi</label>
            <div className="control">
              <textarea
                className="textarea is-primary is-light"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Masukkan Isi"
                required
                style={{ borderRadius: "12px" }}
              />
            </div>
          </div>

          <div className="field">
            <label className="label has-text-pink">Penulis</label>
            <div className="control">
              <input
                className="input is-primary is-light"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Masukkan Nama Penulis"
                required
                style={{ borderRadius: "12px" }}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button
                type="submit"
                className="button is-primary is-light is-fullwidth"
                style={{ borderRadius: "12px" }}
              >
                🔄 Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
