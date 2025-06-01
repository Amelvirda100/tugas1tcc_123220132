import { Link } from "react-router-dom";
import "../styles/style.css"; // pastikan ada style tambahan atau pakai Tailwind

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">Babarsari Kos</h1>
        <nav className="flex gap-6">
          <Link to="/kamar" className="hover:text-yellow-400">🏠 Kamar List</Link>
          <Link to="/sewa" className="hover:text-yellow-400">📄 Sewa List</Link>
          <Link to="/penyewa" className="hover:text-yellow-400">👥 Penyewa List</Link>
          <Link to="/" className="hover:text-red-400">🚪 Logout</Link>
        </nav>
      </header>

      <h2 className="text-xl mb-4">Dashboard Admin Kos</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow text-center">
          <p className="text-gray-400">Total Kamar</p>
          <h3 className="text-3xl font-semibold">0</h3>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow text-center">
          <p className="text-gray-400">Total Penyewa</p>
          <h3 className="text-3xl font-semibold">0</h3>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow text-center">
          <p className="text-gray-400">Sewa Aktif</p>
          <h3 className="text-3xl font-semibold">0</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
