import { Link } from "react-router-dom";
import '../styles/bentuk.css'; 

const Navbar = () => {
  return (
    <header
      style={{
          backgroundColor: "#212529",
          color: "white",
          padding: "16px 32px",
          fontFamily: "Baufra, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          borderBottom: "1px solid #444",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10001, // Lebih tinggi dari sidebar
            }}
    >
      <div style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "1px" }}>
        🏘️ Babarsari Kos
      </div>

      <div>
        <Link to="/">
          <button type="button" className="logout-button">
             🚪  Logout
          </button>
        </Link>

      </div>
    </header>
  );
};

export default Navbar;
