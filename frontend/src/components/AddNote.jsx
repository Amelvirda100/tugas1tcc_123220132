import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
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

  const saveNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://backend-7-171192151600.us-central1.run.app/notes",
        { title, content, author },
        authHeader()
      );
      navigate("/notes");
    } catch (error) {
      alert("Gagal menambahkan catatan: " + error.message);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveNote} className="box has-background-primary-light" style={{ borderRadius: "12px" }}>
          <h1 className="title has-text-pink">Add Note</h1>

          <div className="field">
            <label className="label has-text-pink">Judul</label>
            <div className="control">
              <input
                className="input is-primary is-light"
                type="text"
                placeholder="Judul Catatan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                placeholder="Isi Catatan"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                placeholder="Nama Penulis"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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
                💾 Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
