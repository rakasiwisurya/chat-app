import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Avatar from "./pages/Avatar";
import ProtectedRoute from "./ProtectedRoute";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
          <Route path="/avatar" element={<ProtectedRoute element={<Avatar />} />} />
          <Route path="/" element={<ProtectedRoute element={<Chat />} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
