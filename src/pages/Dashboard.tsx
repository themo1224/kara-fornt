import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
        <p className="mb-4">Welcome, {user?.name ?? 'user'}!</p>
        <button
          onClick={() => logout()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
