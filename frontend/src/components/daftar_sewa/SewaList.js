import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SewaList = () => {
  const [sewa, setSewa] = useState([]);

  useEffect(() => {
    getSewa();
  }, []);

  const getSewa = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sewa');
      setSewa(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSewa = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/sewa/${id}`);
      getSewa();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <Link to={'/add-sewa'} className="button is-primary is-light" style={{ marginBottom: '20px' }}>Tambah Sewa</Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>ID Penyewa</th>
              <th>ID Kamar</th>
              <th>Tanggal Masuk</th>
              <th>Tanggal Keluar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sewa.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id_penyewa}</td>
                <td>{item.id_kamar}</td>
                <td>{item.tgl_masuk}</td>
                <td>{item.tgl_keluar}</td>
                <td>
                  <Link to={`/edit-sewa/${item.id}`} className="button is-small is-info is-light">Edit</Link>
                  <button onClick={() => deleteSewa(item.id)} className="button is-small is-danger is-light">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SewaList;
