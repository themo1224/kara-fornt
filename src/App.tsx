import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
import AppLayout from "./layouts/AppLayout";
import '@coreui/coreui/dist/css/coreui.min.css';
import './coreui-custom.css'   // your overrides



export default function App() {
  return (
    <div dir="rtl" style={{minHeight:'100vh', background:'#f8fafc'}}>

    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
     
      {/* optional: catch-all */}
      <Route path="*" element={<div className="p-8">Page not found</div>} />
      {/* protected layout routes */}
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />

    </Routes>
    </div>
  );
}
