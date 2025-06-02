import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SewaList = () => {
  const [sewa, setSewa] = useState([]);

  useEffect(() => {
    getAllSewa();
  }, []);

const getAllSewa = async () => {
  try {
    const response = await axios.get('http://localhost:5000/sewa');
    console.log(response.data); // Tambahkan ini
    setSewa(response.data);
  } catch (error) {
    console.log(error);
  }
};


  const deleteSewa = async (id_sewa) => {
    try {
      await axios.delete(`http://localhost:5000/sewa/${id_sewa}`);
      getAllSewa();
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

        <Link to={'/sewa/add'} className="button is-primary is-light" style={{ marginBottom: '20px' }}>Tambah Sewa</Link>
        <table className="table is-striped is-fullwidth">
<thead>
  <tr>
    <th>No</th>
    <th>Nama Penyewa</th>
    <th>Nomor Kamar</th>
    <th>Tanggal Masuk</th>
    <th>Tanggal Keluar</th>
    <th>Status</th>
    <th>Aksi</th>
  </tr>
      </thead>
      <tbody>
        {sewa.map((item, index) => (
            console.log('item tanggal:', item.tgl_mulai, item.tgl_selesai, item.status_sewa),
          <tr key={item.id_sewa}>
            <td>{index + 1}</td>
            <td>{item.nama}</td>
            <td>{item.no_kamar}</td>
            <td>{item.tgl_mulai}</td>
            <td>{item.tgl_selesai}</td>
            <td>{item.status_sewa}</td>
            <td>
              <Link to={`/sewa/edit/${item.id_sewa}`} className="button is-small is-info is-light">Edit</Link>
              <button onClick={() => deleteSewa(item.id_sewa)} className="button is-small is-danger is-light">Hapus</button>
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
