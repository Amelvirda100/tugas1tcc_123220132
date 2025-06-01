import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PenyewaList = () => {
  const [penyewa, setPenyewa] = useState([]);

  useEffect(() => {
    getPenyewa();
  }, []);

  const getPenyewa = async () => {
    try {
      const response = await axios.get('http://localhost:5000/penyewa');
      setPenyewa(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePenyewa = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/penyewa/${id}`);
      getPenyewa();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <Link to={'/add-penyewa'} className="button is-primary is-light" style={{ marginBottom: '20px' }}>Tambah Penyewa</Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>No HP</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penyewa.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.alamat}</td>
                <td>{item.nohp}</td>
                <td>
                  <Link to={`/edit-penyewa/${item.id}`} className="button is-small is-info is-light">Edit</Link>
                  <button onClick={() => deletePenyewa(item.id)} className="button is-small is-danger is-light">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PenyewaList;
