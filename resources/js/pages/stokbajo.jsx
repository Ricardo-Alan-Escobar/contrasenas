import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import InventarioModal from '@/Components/InventarioModal';
import { AlertTriangle, PackageX, MoreVertical, Minus, Plus, Search } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Swal from 'sweetalert2';

export default function StockBajo({ items }) {
    const [open, setOpen] = useState(false);
    const [selectedToner, setSelectedToner] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar items según búsqueda
    const filteredItems = items.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        return (
            item.modelo?.toLowerCase().includes(searchLower) ||
            item.marca?.toLowerCase().includes(searchLower) ||
            item.color?.toLowerCase().includes(searchLower)
        );
    });

    // Calcular estadísticas
    const stockBajo = items.filter(item => item.cantidad_inicial <= item.stock_minimo && item.cantidad_inicial > 0).length;
    const agotados = items.filter(item => item.cantidad_inicial === 0).length;

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: '#18181b',
        color: '#fff',
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    function handleEdit(toner) {
        setSelectedToner(toner);
        setOpen(true);
    }

    function handleDelete(id) {
        Swal.fire({
            title: '¿Eliminar toner?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803d',
            cancelButtonColor: '#71717a',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#18181b',
            color: '#fff',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/inventario/${id}`, {
                    onSuccess: () => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Toner eliminado',
                        });
                    },
                });
            }
        });
    }

    function handleIncrement(item) {
        router.put(`/inventario/${item.id}`, {
            ...item,
            cantidad_inicial: parseInt(item.cantidad_inicial) + 1,
        }, {
            onSuccess: () => {
                Toast.fire({
                    icon: 'success',
                    title: 'Cantidad actualizada',
                });
            },
        });
    }

    function handleDecrement(item) {
        if (item.cantidad_inicial > 0) {
            router.put(`/inventario/${item.id}`, {
                ...item,
                cantidad_inicial: parseInt(item.cantidad_inicial) - 1,
            }, {
                onSuccess: () => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Cantidad actualizada',
                    });
                },
            });
        }
    }

    function getColorCircle(color) {
        const colorMap = {
            'Negro': 'bg-black',
            'Cyan': 'bg-cyan-500',
            'Magenta': 'bg-fuchsia-500',
            'Amarillo': 'bg-yellow-400',
            'Tricolor': 'bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-yellow-400',
        };
        return colorMap[color] || 'bg-zinc-500';
    }

    function getStatusBadge(item) {
        if (item.cantidad_inicial === 0) {
            return <span className="px-2 py-1 text-xs rounded-md bg-red-500/10 text-red-500 border border-red-500/20">Agotado</span>;
        }
        if (item.cantidad_inicial <= item.stock_minimo) {
            return <span className="px-2 py-1 text-xs rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Stock Bajo</span>;
        }
        return <span className="px-2 py-1 text-xs rounded-md bg-green-500/10 text-green-500 border border-green-500/20">En Stock</span>;
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Stock Bajo' }]}>
            <Head title="Stock Bajo" />

            <div className="p-6 space-y-6">
                {/* ESTADÍSTICAS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-zinc-400 text-sm mb-1">Stock Bajo</p>
                                <p className="text-3xl font-bold text-white">{stockBajo}</p>
                            </div>
                            <div className="bg-yellow-500/10 p-3 rounded-lg">
                                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-zinc-400 text-sm mb-1">Agotados</p>
                                <p className="text-3xl font-bold text-white">{agotados}</p>
                            </div>
                            <div className="bg-red-500/10 p-3 rounded-lg">
                                <PackageX className="w-6 h-6 text-red-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* HEADER */}
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-xl font-semibold text-white">
                        Stock Bajo y Agotados
                    </h1>

                    <div className="flex items-center gap-3">
                        {/* BARRA DE BÚSQUEDA */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Buscar toner..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition w-64"
                            />
                        </div>
                    </div>
                </div>

                {/* LISTADO */}
                <div className="space-y-3">
                    {filteredItems.length === 0 && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
                            <AlertTriangle className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                            <p className="text-zinc-400 text-sm">
                                {searchTerm ? 'No se encontraron resultados.' : 'No hay toner con stock bajo o agotado.'}
                            </p>
                        </div>
                    )}

                    {filteredItems.map(item => (
                        <div
                            key={item.id}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition"
                        >
                            <div className="flex items-center justify-between">
                                {/* IZQUIERDA: Info del toner */}
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold ${getColorCircle(item.color)}`}>
                                        {item.color ? item.color.charAt(0).toUpperCase() : 'T'}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-white font-semibold">{item.modelo}</h3>
                                            <span className="text-zinc-500 font-medium">{item.marca}</span>
                                            {getStatusBadge(item)}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-zinc-400">
                                            <span>
                                                Compra: <span className="text-white font-medium">${item.precio_compra}</span>
                                            </span>
                                            <span>
                                                Venta: <span className="text-green-500 font-semibold">${item.precio_venta}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* DERECHA: Controles de cantidad */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => handleDecrement(item)}
                                            disabled={item.cantidad_inicial === 0}
                                            className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        
                                        <div className="text-center min-w-[60px]">
                                            <p className={`text-2xl font-bold ${
                                                item.cantidad_inicial === 0 ? 'text-red-500' :
                                                item.cantidad_inicial <= item.stock_minimo ? 'text-yellow-500' :
                                                'text-green-500'
                                            }`}>
                                                {item.cantidad_inicial}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                mín: {item.stock_minimo}
                                            </p>
                                        </div>

                                        <button 
                                            onClick={() => handleIncrement(item)}
                                            className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                                            <DropdownMenuItem 
                                                onClick={() => handleEdit(item)}
                                                className="cursor-pointer hover:bg-zinc-800"
                                            >
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                onClick={() => handleDelete(item.id)}
                                                className="cursor-pointer hover:bg-zinc-800 text-red-500"
                                            >
                                                Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            <InventarioModal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setSelectedToner(null);
                }}
                toner={selectedToner}
            />
        </AppLayout>
    );
}