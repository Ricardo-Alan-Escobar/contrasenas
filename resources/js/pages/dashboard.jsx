import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Search, EyeClosed, Eye, Check, Copy, ExternalLink, Ellipsis, Pencil, Trash  } from 'lucide-react';
import PasswordModal from '../components/passwordModal';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function Dashboard({ passwords = [] }) {
    const [open, setOpen] = useState(false);
const [showPasswordId, setShowPasswordId] = useState(null);
const [copiedId, setCopiedId] = useState(null);
const [openMenuId, setOpenMenuId] = useState(false);
const [editingPassword, setEditingPassword] = useState(null);
const [searchTerm, setSearchTerm] = useState('');

    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: '#18181b',
    color: '#fff',
});

function handleDelete(id) {
    Swal.fire({
        title: '¿Eliminar contraseña?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        background: '#18181b', 
        color: '#e4e4e7', 
        showCancelButton: true,
        confirmButtonColor: '#15803d', 
        cancelButtonColor: '#27272a', 
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        iconColor: '#facc15', 
        customClass: {
            popup: 'rounded-xl',
            title: 'text-white',
            htmlContainer: 'text-zinc-400',
            confirmButton: 'rounded-md px-4 py-2',
            cancelButton: 'rounded-md px-4 py-2',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(`/passwords/${id}`, {
                onSuccess: () => {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        background: '#18181b',
                        color: '#e4e4e7',
                        icon: 'success',
                        iconColor: '#22c55e', 
                        title: 'Contraseña eliminada',
                        showConfirmButton: false,
                        timer: 2000,
                        customClass: {
                            popup: 'rounded-xl',
                        },
                    });
                },
            });
        }
    });
}
const filteredPasswords = passwords.filter(p => {
    const search = searchTerm.toLowerCase();
    return (
        p.site_name.toLowerCase().includes(search) ||
        p.username.toLowerCase().includes(search) ||
        (p.category && p.category.toLowerCase().includes(search)) ||
        (p.site_url && p.site_url.toLowerCase().includes(search))
    );
});


    return (
        <AppLayout breadcrumbs={[{ title: 'Bóveda' }]}>
            <Head title="Bóveda" />

            <div className="p-6 space-y-6">

                <div className="flex justify-between items-center">
                    <div>                  <h1 className="text-xl font-semibold text-white">
                        Mis contraseñas
                    </h1>
                    <p className="text-xs text-zinc-400">Todas tus contraseñas seguras en un solo lugar</p>
                    </div>
  
                    <div className="flex items-center gap-3">
    {/* Barra de búsqueda */}
    <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <input
            type="text"
            placeholder="Buscar contraseñas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-800 transition"
        />
    </div>

    <button
        onClick={() => setOpen(true)}
        className="w-44 cursor-pointer p-2 flex items-center justify-center text-sm text-white bg-green-900 rounded-md hover:bg-green-700 transition"
    >
        <Plus className="mr-2" size={18} /> Agregar
    </button>
</div>
                </div>

                {/* LISTADO */}
            <div className="space-y-3">
    {filteredPasswords.length > 0 ? (
        filteredPasswords.map(p => {
        const isVisible = showPasswordId === p.id;
        const isCopied = copiedId === p.id;

        return (
            <div
                key={p.id}
                className="flex items-center justify-between border border-zinc-700 bg-zinc-900 rounded-xl px-5 py-4 hover:border-green-800 transition"
            >
                {/* IZQUIERDA */}
                <div className="flex items-center gap-4">
                    <div className="w-15 h-15 rounded-full bg-zinc-800 flex items-center justify-center text-white font-semibold text-2xl">
                        {p.site_name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">
                                {p.site_name}
                            </h3>

                            {p.category && (
                                <span className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300">
                                    {p.category}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-4 mt-0.5">
                        <p className="text-sm text-zinc-400">
                            {p.username}
                        </p>

                        {p.site_url && (
                            <p className="text-xs text-zinc-500">
                                {p.site_url.replace(/^https?:\/\//, '')}
                            </p>
                        )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Password */}
                    <div className=" flex items-center gap-3 px-3 py-2.5 rounded-md bg-zinc-800 text-sm text-zinc-300 min-w-[90px] text-center">
                        {isVisible ? p.password : (<span className='text-xl'>• • • • • • • • • • •</span>)}
                    <button
                        onClick={() =>
                            setShowPasswordId(isVisible ? null : p.id)
                        }
                        className="text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                        {isVisible ? <EyeClosed size={18} /> : <Eye size={18} />}
                    </button>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(p.password);
                            setCopiedId(p.id);

                            Toast.fire({
                                icon: 'success',
                                title: 'Contraseña copiada',
                            });

                            setTimeout(() => setCopiedId(null), 1500);
                        }}
                        className={`transition ${
                            isCopied
                                ? 'text-green-500'
                                : 'text-zinc-400 hover:text-white cursor-pointer'
                        }`}
                    >
                        {isCopied ? <Check size={18} /> : <Copy size={18} />}
                    </button>

                    </div>

                     {p.site_url && (
            <a
                href={p.site_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition hover:bg-zinc-800 p-3 rounded-md "
                title="Abrir sitio"
            >
                <ExternalLink size={18} />
            </a>
        )}


        <div className="relative">
    <button
        onClick={() =>
            setOpenMenuId(openMenuId === p.id ? null : p.id)
        }
        className="text-zinc-400 cursor-pointer hover:text-white flex items-center p-3 rounded-md transition hover:bg-zinc-800"
    >
        <Ellipsis size={18} />
    </button>

    {openMenuId === p.id && (
        <div className="absolute right-0 mt-2 w-36 rounded-md bg-zinc-800 border border-zinc-700 shadow-lg z-50">
            <button
                onClick={() => {
                    setEditingPassword(p);
                    setOpen(true);
                    setOpenMenuId(null);
                }}
                className="w-11/12 cursor-pointer m-1 text-zinc-400 flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-700 rounded-md"
            >
                <Pencil size={14} /> Editar
            </button>

            <button
                onClick={() => handleDelete(p.id)}
                className="w-11/12 m-1 flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-red-700 hover:bg-zinc-700 rounded-md"
            >
                <Trash size={14} /> Eliminar
            </button>
        </div>
    )}
</div>


                </div>
            </div>
        );
    })) : (
        <div className="text-center py-12">
            <Search className="mx-auto text-zinc-600 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-zinc-400 mb-2">
                No se encontraron resultados
            </h3>
            <p className="text-sm text-zinc-500">
                {searchTerm 
                    ? `No hay contraseñas que coincidan con "${searchTerm}"`
                    : 'No tienes contraseñas guardadas aún'
                }
            </p>
        </div>
    )}
</div>

                {/* MODAL */}
                <PasswordModal
    open={open}
    onClose={() => {
        setOpen(false);
        setEditingPassword(null);
    }}
    password={editingPassword}
/>

            </div>
        </AppLayout>
    );
}
