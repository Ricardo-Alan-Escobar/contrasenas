import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import InventarioModal from '@/Components/InventarioModal';

export default function Inventario({ items }) {
    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventario' }]}>
            <Head title="Inventario de Toner" />

            <div className="p-6 space-y-6">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-white">
                        Inventario de Toner
                    </h1>

                    <button
                        onClick={() => setOpen(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                        + Nuevo toner
                    </button>
                </div>

                {/* LISTADO */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <div className="space-y-2">
                        {items.length === 0 && (
                            <p className="text-zinc-400 text-sm">
                                No hay toner registrados.
                            </p>
                        )}

                        {items.map(item => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center bg-zinc-800 rounded-lg p-3 text-sm"
                            >
                                <div>
                                    <p className="text-white font-medium">
                                        {item.marca} – {item.modelo}
                                    </p>
                                    <p className="text-zinc-400">
                                        {item.color || 'Sin color'} · Stock:{' '}
                                        {item.cantidad_inicial}
                                    </p>
                                </div>

                                <div className="text-right text-zinc-300">
                                    <p>Compra: ${item.precio_compra}</p>
                                    <p>Venta: ${item.precio_venta}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <InventarioModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </AppLayout>
    );
}
