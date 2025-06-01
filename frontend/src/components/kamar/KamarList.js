import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const KamarList = () => {
  const [kamar, setKamar] = useState([]);

  const authHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    getKamar();
  }, []);

  const getKamar = async () => {
    try {
      const response = await axios.get('http://localhost:5000/kamar', authHeader());
      setKamar(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteKamar = async (kamar_id) => {
    try {
      await axios.delete(`http://localhost:5000/kamar/${kamar_id}`, authHeader());
      getKamar();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        {/* Tombol Back ke Dashboard */}
      <Link 
        to="/dashboard" 
        className="button is-success is-light is-small mb-4"
        style={{ position: 'absolute', top: '20px', left: '20px' }}
      >
        Back
      </Link>

        <Link to={'/kamar/add'} className="button is-primary is-light" style={{ marginBottom: '20px' }}>
          Tambah Kamar
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nomor Kamar</th>
              <th>Tipe</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kamar.map((item, index) => (
              <tr key={item.kamar_id}>
                <td>{index + 1}</td>
                <td>{item.no_kamar}</td>
                <td>{item.tipe_kamar}</td>
                <td>{item.harga}</td>
                <td>
                  <Link to={`/kamar/edit/${item.kamar_id}`} className="button is-small is-info is-light">Edit</Link>
                  <button onClick={() => deleteKamar(item.kamar_id)} className="button is-small is-danger is-light">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KamarList;
