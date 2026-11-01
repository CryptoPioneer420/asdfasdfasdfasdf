import React, { useState } from 'react';
import { Lock, Plus, Trash2, Edit2 } from 'lucide-react';
import { useMiners } from '../context/MinerContext';
import { Miner } from '../types';
import MinerFormModal from './MinerFormModal';

interface AdminPanelProps {
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { miners, deleteMiner, addMiner, updateMiner } = useMiners();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMiner, setEditingMiner] = useState<Miner | undefined>(undefined);

  // Mock Login
  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if(password === 'admin123') {
          setIsAuthenticated(true);
      } else {
          alert('Invalid password');
      }
  };

  const handleDelete = (id: string) => {
      if(confirm('Are you sure you want to delete this miner?')) {
          deleteMiner(id);
      }
  };

  const handleEdit = (miner: Miner) => {
      setEditingMiner(miner);
      setIsModalOpen(true);
  };

  const handleAddNew = () => {
      setEditingMiner(undefined);
      setIsModalOpen(true);
  };

  const handleSaveMiner = (miner: Miner) => {
      if (editingMiner) {
          updateMiner(miner);
      } else {
          addMiner(miner);
      }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-sm w-full">
            <div className="flex justify-center mb-6 text-teal-600">
                <Lock size={48} />
            </div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Admin Access</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input 
                    type="password" 
                    placeholder="Enter password" 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-lg font-bold hover:bg-teal-700 transition">
                    Login
                </button>
            </form>
            <button onClick={onBack} className="w-full mt-4 text-gray-500 text-sm hover:underline">
                Back to Dashboard
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button 
            onClick={handleAddNew}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700"
          >
             <Plus size={20} /> Add Miner
          </button>
       </div>

       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs uppercase">
                  <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Algorithm</th>
                      <th className="p-4">Hashrate</th>
                      <th className="p-4 text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {miners.map(miner => (
                      <tr key={miner.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="p-4 font-medium text-gray-900 dark:text-white">{miner.name}</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">{miner.algorithm}</td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">{miner.hashrate} {miner.hashrateUnit}</td>
                          <td className="p-4 text-right flex justify-end gap-2">
                              <button 
                                onClick={() => handleEdit(miner)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                  onClick={() => handleDelete(miner.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                              >
                                  <Trash2 size={16} />
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
       </div>

       <MinerFormModal 
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         onSave={handleSaveMiner}
         initialData={editingMiner}
       />
    </div>
  );
};

export default AdminPanel;
