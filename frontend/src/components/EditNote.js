import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`https://tugas6-backend-171192151600.us-central1.run.app${id}`);
                console.log(response.data);
                setTitle(response.data.judul);
                setContent(response.data.isi);
                setAuthor(response.data.penulis);
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };

        fetchNote();
    }, [id]);

    const updateNote = async (e) => {
        e.preventDefault();
        const updatedData = { title, content, author };

        console.log('ID yang dikirim:', id);
        console.log('Data yang dikirim:', updatedData);

        try {
            const response = await axios.put(`https://tugas6-backend-171192151600.us-central1.run.app${id}`, updatedData);
            console.log('Response sukses:', response);
            navigate('/');
        } catch (error) {
            console.error('Response error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={updateNote} className="box has-background-primary-light">
                    <div className="field">
                        <label className="label">Judul</label>
                        <div className="control">
                            <input className="input is-primary is-light" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Judul" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Isi</label>
                        <div className="control">
                            <textarea className="textarea is-primary is-light" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Masukkan Isi"></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Penulis</label>
                        <div className="control">
                            <input className="input is-primary is-light" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Masukkan Nama Penulis" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-primary is-light">🔄 Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNote;
