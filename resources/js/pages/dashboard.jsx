import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import PasswordModal from '../components/passwordModal';

export default function Dashboard({ passwords = [] }) {
    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={[{ title: 'Bóveda' }]}>
            <Head title="Bóveda" />

            <div className="p-6 space-y-6">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-white">
                        Mis contraseñas
                    </h1>

                    <button
                        onClick={() => setOpen(true)}
                        className="w-44 cursor-pointer p-2 flex items-center justify-center text-sm text-white bg-green-900 rounded-md hover:bg-green-700 transition"
                    >
                        <Plus className="mr-2" size={18} /> Agregar
                    </button>
                </div>

                {/* LISTADO */}
                <div className="space-y-3">
                    {passwords.map(p => (
                        <div key={p.id} className="border border-zinc-700 p-4 rounded">
                            <h3 className="font-semibold text-white">
                                {p.site_name}
                            </h3>
                            <p className="text-sm text-zinc-400">
                                {p.username}
                            </p>
                        </div>
                    ))}
                </div>

                {/* MODAL */}
                <PasswordModal
                    open={open}
                    onClose={() => setOpen(false)}
                />

            </div>
        </AppLayout>
    );
}
