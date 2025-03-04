import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();

    const saveNote = async (e) => {
        e.preventDefault();
        const noteData = { title, content, author };
        console.log('Data yang dikirim:', noteData); // Debugging
        try {
            await axios.post('http://localhost:5000/notes', noteData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={saveNote} className="box has-background-primary-light">
                    <div className="field">
                        <label className="label">Judul</label>
                        <div className="control">
                            <input className="input is-primary is-light" type="text" placeholder="Judul Catatan" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Isi</label>
                        <div className="control">
                            <textarea className="textarea is-primary is-light" placeholder="Isi Catatan" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Penulis</label>
                        <div className="control">
                            <input className="input is-primary is-light" type="text" placeholder="Nama Penulis" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-primary is-light">💾 Simpan</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNote;