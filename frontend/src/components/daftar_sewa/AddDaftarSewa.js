import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDaftarSewa = () => {
  const [penyewaList, setPenyewaList] = useState([]);
  const [kamarList, setKamarList] = useState([]);
  const [id_penyewa, setIdPenyewa] = useState('');
  const [kamar_id, setKamarId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPenyewa = await axios.get('http://localhost:5000/penyewa');
        setPenyewaList(resPenyewa.data);

        const resKamar = await axios.get('http://localhost:5000/kamar');
        setKamarList(resKamar.data.filter(kamar => kamar.status === 'kosong'));
      } catch (error) {
        console.error(error);
        alert('Gagal mengambil data penyewa atau kamar');
      }
    };
    fetchData();
  }, []);

  const saveDaftarSewa = async (e) => {
    e.preventDefault();
    try {
      // Cek status kamar
      const resKamar = await axios.get(`http://localhost:5000/kamar/${kamar_id}`);
      if (resKamar.data.status !== 'kosong') {
        alert('Kamar tidak tersedia');
        return;
      }

      // Tambah daftar sewa
      await axios.post('http://localhost:5000/daftar_sewa', {
        id_penyewa,
        kamar_id,
        tgl_mulai: new Date().toISOString().split('T')[0],
        status_sewa: 'Aktif'
      });

      // Update status kamar
      await axios.put(`http://localhost:5000/kamar/${kamar_id}`, {
        ...resKamar.data,
        status: 'terisi'
      });

      navigate('/daftar_sewa');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan data sewa');
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveDaftarSewa} className="box">
          <h3 className="title is-4">Tambah Daftar Sewa</h3>

          <div className="field">
            <label className="label">Pilih Penyewa</label>
            <div className="select is-fullwidth">
              <select value={id_penyewa} onChange={(e) => setIdPenyewa(e.target.value)} required>
                <option value="">-- Pilih Penyewa --</option>
                {penyewaList.map((p) => (
                  <option key={p.id} value={p.id}>{p.nama}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label">Pilih Kamar</label>
            <div className="select is-fullwidth">
              <select value={kamar_id} onChange={(e) => setKamarId(e.target.value)} required>
                <option value="">-- Pilih Kamar --</option>
                {kamarList.map((k) => (
                  <option key={k.id} value={k.id}>{k.nomor_kamar} - {k.tipe_kamar}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="button is-primary is-light mt-4">💾 Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default AddDaftarSewa;
