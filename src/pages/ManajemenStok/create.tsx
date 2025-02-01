import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { MenuProps } from '@/utils/interfaces';
import { ToastSuccess } from '@/components/Toasts';
import { useNavigate } from 'react-router-dom';

const ManajemenStokCreate: React.FC = () => {
    const navigate = useNavigate()
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [stockQuantity, setStockQuantity] = useState<string>('');

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get<MenuProps[]>('http://localhost:5000/api/menu');
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/stok/${selectedMenu}/add`, {
        quantity: parseInt(stockQuantity, 10)
      });
      ToastSuccess('Stok berhasil ditambahkan');
      navigate('/admin/stok/menu')
      setSelectedMenu('');
      setStockQuantity('');
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-center font-semibold text-2xl mb-6">
        Tambahkan Stok Baru
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 py-10">
        <div>
          <label className="block mb-2 font-medium">Pilih Menu</label>
          <select 
            name="menu" 
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value)}
            className="w-full border-gray-500 border-[1.5px] rounded-full p-2"
            required
          >
            <option value="">Pilih Menu</option>
            {menus.map((menu) => (
              <option key={menu.id} value={menu.id}>
                {menu.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">Jumlah Stok</label>
          <input 
            type="number" 
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            className="w-full border-gray-500 border-[1.5px] rounded-full p-2"
            placeholder="Masukkan jumlah stok"
            min="1"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-primary60 text-white py-2 rounded-full hover:bg-primary50 transition-all"
        >
          Tambah Stok
        </button>
      </form>
    </div>
  );
};

export default ManajemenStokCreate;