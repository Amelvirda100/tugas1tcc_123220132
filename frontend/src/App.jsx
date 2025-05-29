import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import EditUser from "./components/EditUser.jsx";
import Navbar from "./components/NavBar.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/DashBoard.jsx";
import Register from "./components/Register.jsx";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Default: Redirect to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Notes Routes */}
        <Route
          path="/notes"
          element={token ? <NoteList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/notes/add"
          element={token ? <AddNote /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit/:id"
          element={token ? <EditNote /> : <Navigate to="/login" replace />}
        />

        {/* Dashboard with Navbar */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <>
                <Navbar />
                <Dashboard />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Edit User Page */}
        <Route
          path="/users/edit/:id"
          element={token ? <EditUser /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
