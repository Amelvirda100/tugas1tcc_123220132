import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDaftarSewa = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [daftarSewa, setDaftarSewa] = useState(null);
  const [kamar, setKamar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSewa = await axios.get(`http://localhost:5000/daftar_sewa/${id}`);
        setDaftarSewa(resSewa.data);

        const resKamar = await axios.get(`http://localhost:5000/kamar/${resSewa.data.kamar_id}`);
        setKamar(resKamar.data);
      } catch (error) {
        console.error(error);
        alert('Gagal mengambil data');
      }
    };
    fetchData();
  }, [id]);

  const handleSelesaiSewa = async (e) => {
    e.preventDefault();
    try {
      // 1. Update status_sewa di tabel daftar_sewa
      await axios.put(`http://localhost:5000/daftar_sewa/${id}`, {
        ...daftarSewa,
        status_sewa: 'Selesai',
        tgl_selesai: new Date().toISOString().split('T')[0],
      });

      // 2. Update status kamar jadi kosong
      await axios.put(`http://localhost:5000/kamar/${kamar.id}`, {
        ...kamar,
        status: 'kosong',
      });

      alert('Sewa berhasil diakhiri.');
      navigate('/daftar_sewa');
    } catch (error) {
      console.error(error);
      alert('Gagal menyelesaikan sewa');
    }
  };

  if (!daftarSewa || !kamar) {
    return <div className="has-text-centered mt-6">⏳ Memuat data...</div>;
  }

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <div className="box">
          <h3 className="title is-4">Akhiri Sewa</h3>

          <div className="content">
            <p><strong>Nama Penyewa:</strong> {daftarSewa.penyewa_nama}</p>
            <p><strong>Nomor Kamar:</strong> {kamar.nomor_kamar}</p>
            <p><strong>Status Sewa Saat Ini:</strong> {daftarSewa.status_sewa}</p>
            <p><strong>Tanggal Mulai:</strong> {daftarSewa.tgl_mulai}</p>
          </div>

          {daftarSewa.status_sewa === 'Aktif' ? (
            <form onSubmit={handleSelesaiSewa}>
              <button type="submit" className="button is-danger is-light">
                ❌ Akhiri Sewa
              </button>
            </form>
          ) : (
            <div className="notification is-success is-light">
              Sewa sudah selesai.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDaftarSewa;
