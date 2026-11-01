import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Miner, CoolingType } from '../types';

interface MinerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (miner: Miner) => void;
  initialData?: Miner;
}

const MinerFormModal: React.FC<MinerFormModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<Miner>>({
    id: '',
    name: '',
    manufacturer: '',
    algorithm: 'SHA-256',
    hashrate: 0,
    hashrateUnit: 'TH/s',
    power: 0,
    noise: 75,
    cooling: 'Air',
    price: 0,
    minableCoins: [],
    releaseDate: new Date().toISOString().slice(0, 7), // YYYY-MM
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset for new entry
      setFormData({
        id: '',
        name: '',
        manufacturer: '',
        algorithm: 'SHA-256',
        hashrate: 0,
        hashrateUnit: 'TH/s',
        power: 0,
        noise: 75,
        cooling: 'Air',
        price: 0,
        minableCoins: [],
        releaseDate: new Date().toISOString().slice(0, 7),
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const minerData = {
      ...formData,
      id: initialData?.id || `${formData.manufacturer?.toLowerCase()}-${formData.name?.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      vendorLinks: initialData?.vendorLinks || []
    } as Miner;
    
    onSave(minerData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {initialData ? 'Edit Miner' : 'Add New Miner'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white border-b pb-2 dark:border-gray-700">Basic Info</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Manufacturer</label>
                <input required name="manufacturer" value={formData.manufacturer} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Release Date (YYYY-MM)</label>
                <input required name="releaseDate" value={formData.releaseDate} onChange={handleChange} placeholder="2024-01" className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            </div>

            {/* Specs */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white border-b pb-2 dark:border-gray-700">Technical Specs</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Algorithm</label>
                <input required name="algorithm" value={formData.algorithm} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hashrate</label>
                  <input required type="number" step="any" name="hashrate" value={formData.hashrate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
                  <select name="hashrateUnit" value={formData.hashrateUnit} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option>TH/s</option>
                    <option>GH/s</option>
                    <option>MH/s</option>
                    <option>kH/s</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Power (W)</label>
                  <input required type="number" name="power" value={formData.power} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white border-b pb-2 dark:border-gray-700">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cooling Type</label>
                    <select name="cooling" value={formData.cooling} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option value="Air">Air</option>
                        <option value="Hydro">Hydro</option>
                        <option value="Immersion">Immersion</option>
                    </select>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Noise (dB)</label>
                     <input type="number" name="noise" value={formData.noise} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                 <input name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="https://..." />
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                 <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t dark:border-gray-700">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 mr-2">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Save Miner</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MinerFormModal;
