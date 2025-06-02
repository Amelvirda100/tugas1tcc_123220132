import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDaftarSewa = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [daftarSewa, setDaftarSewa] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSewa = await axios.get(`http://localhost:5000/sewa/${id}`);
        setDaftarSewa(resSewa.data);
      } catch (error) {
        console.error(error);
        alert('Gagal mengambil data');
      }
    };
    fetchData();
  }, [id]);

  // Fungsi untuk update status sewa dan update status kamar jadi Kosong
const updateStatusSewa = async (statusBaru) => {
  try {
    if (statusBaru === 'Selesai') {
      await axios.put(`http://localhost:5000/sewa/${id}/selesai`);
    } else if (statusBaru === 'Dibatalkan') {
      await axios.put(`http://localhost:5000/sewa/${id}/batalkan`);
    }

    alert(`Sewa berhasil di${statusBaru === 'Selesai' ? 'akhiri' : 'batalkan'}.`);
    navigate('/sewa');
  } catch (error) {
    console.error(error);
    alert(`Gagal ${statusBaru === 'Selesai' ? 'menyelesaikan' : 'membatalkan'} sewa`);
  }
};


  if (!daftarSewa) {
    return <div className="has-text-centered mt-6">⏳ Memuat data...</div>;
  }

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <div className="box">
          <h3 className="title is-4">Kelola Sewa</h3>

          <div className="content">
            <p><strong>Nama Penyewa:</strong> {daftarSewa.nama}</p>
            <p><strong>Nomor Kamar:</strong> {daftarSewa.no_kamar}</p>
            <p><strong>Status Sewa Saat Ini:</strong> {daftarSewa.status_sewa}</p>
            <p><strong>Tanggal Mulai:</strong> {daftarSewa.tgl_mulai}</p>
            {daftarSewa.tgl_selesai && <p><strong>Tanggal Selesai:</strong> {daftarSewa.tgl_selesai}</p>}
          </div>

          {daftarSewa.status_sewa === 'Aktif' ? (
            <div className="buttons">
              <button
                onClick={() => updateStatusSewa('Selesai')}
                className="button is-danger is-light"
              >
                ❌ Akhiri Sewa
              </button>
              <button
                onClick={() => updateStatusSewa('Dibatalkan')}
                className="button is-warning is-light"
              >
                🚫 Batalkan Sewa
              </button>
            </div>
          ) : daftarSewa.status_sewa === 'Selesai' ? (
            <div className="notification is-success is-light">
              Sewa sudah selesai.
            </div>
          ) : (
            <div className="notification is-danger is-light">
              Sewa telah dibatalkan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDaftarSewa;
