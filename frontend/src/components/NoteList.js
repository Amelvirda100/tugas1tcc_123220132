import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NoteList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const response = await axios.get('https://tugas6-backend-171192151600.us-central1.run.app/notes');
            console.log(response.data); // Tambahkan ini
            setNotes(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    

    const deleteNote = async (id) => {
        try {
            await axios.delete(`https://tugas6-backend-171192151600.us-central1.run.app/notes/${id}`);
            getNotes();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <Link to={'add'} className="button is-primary is-light"  style={{ marginBottom: '20px' }}>➕ Tambah Catatan</Link>
                <table className="table is-striped is-fullwidth">
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
                                <td>{note.judul}</td>
                                <td>{note.isi}</td>
                                <td>{note.penulis}</td>
                                <td>
                                    <Link to={`/edit/${note.id}`} className="button is-small is-info is-light">✏️ Edit</Link>
                                    <button onClick={() => deleteNote(note.id)} className="button is-small is-danger is-light">🗑️ Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NoteList;
