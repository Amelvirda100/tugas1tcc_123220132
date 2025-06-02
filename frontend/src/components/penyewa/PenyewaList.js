import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PenyewaList = () => {
  const [penyewa, setPenyewa] = useState([]);

  const authHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    getPenyewa();
  }, []);

  const getPenyewa = async () => {
    try {
      const response = await axios.get('http://localhost:5000/penyewa', authHeader());
      setPenyewa(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePenyewa = async (id_penyewa) => {
    try {
      await axios.delete(`http://localhost:5000/penyewa/${id_penyewa}`, authHeader());
      getPenyewa();
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
      
        <Link to={'/penyewa/add'} className="button is-primary is-light" style={{ marginBottom: '20px' }}>Tambah Penyewa</Link>
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
              console.log("Data penyewa:", item),

              <tr key={item.id_penyewa}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.alamat}</td>
                <td>{item.nohp}</td>
                <td>
                  <Link to={`/penyewa/edit/${item.id_penyewa}`} className="button is-small is-info is-light">Edit</Link>
                  <button onClick={() => deletePenyewa(item.id_penyewa)} className="button is-small is-danger is-light">Hapus</button>
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
