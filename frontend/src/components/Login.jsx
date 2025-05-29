import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg(""); // reset pesan error saat submit
    try {
      const res = await axios.post(
        "https://backend-7-171192151600.us-central1.run.app/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.accessToken);
      navigate("/notes");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login gagal");
    }
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={handleLogin} className="box">
                {msg && (
                  <p className="has-text-centered has-text-danger">{msg}</p>
                )}
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field mt-4">
                  <button className="button is-success is-fullwidth" type="submit">
                    Login
                  </button>
                </div>
                <p className="has-text-centered mt-4" style={{ fontSize: "16px" }}>
                  Belum punya akun?{" "}
                  <Link to="/register" style={{ color: "green", textDecoration: "underline" }}>
                    Daftar di sini
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
