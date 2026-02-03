import React from 'react';
import { Plus, Search } from 'lucide-react';
import PasswordModal from './passwordModal';

const PasswordManagerUI = () => {
  return (
    <div className="flex flex-col gap-5 px-2 py-2">

      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
        />
        <input
          type="text"
          placeholder="Buscar contraseñas..."
          className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      
      <button className="w-full p-2 flex items-center justify-center text-sm text-white bg-green-900 rounded-md hover:bg-green-700 transition">
        <Plus className="mr-2" size={18} />
        Añadir nuevo
      </button>

    </div>
  );
};

export default PasswordManagerUI;
