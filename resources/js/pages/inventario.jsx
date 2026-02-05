import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function Inventario({ items }) {
    const { data, setData, post, reset, processing } = useForm({
        modelo: '',
        marca: '',
        color: '',
        cantidad_inicial: '',
        stock_minimo: '',
        precio_compra: '',
        precio_venta: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/inventario', {
            onSuccess: () => reset(),
        });
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventario' }]}>
            <Head title="Inventario de Toner" />

            <div className="p-6 space-y-8">
                {/* FORMULARIO */}
                <form
                    onSubmit={submit}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 grid grid-cols-2 gap-4"
                >
                    <input
                        placeholder="Modelo"
                        value={data.modelo}
                        onChange={e => setData('modelo', e.target.value)}
                        className="input"
                    />
                    <input
                        placeholder="Marca"
                        value={data.marca}
                        onChange={e => setData('marca', e.target.value)}
                        className="input"
                    />
                    <input
                        placeholder="Color"
                        value={data.color}
                        onChange={e => setData('color', e.target.value)}
                        className="input"
                    />

                    <input
                        type="number"
                        placeholder="Cantidad inicial"
                        value={data.cantidad_inicial}
                        onChange={e => setData('cantidad_inicial', e.target.value)}
                        className="input"
                    />
                    <input
                        type="number"
                        placeholder="Stock mínimo"
                        value={data.stock_minimo}
                        onChange={e => setData('stock_minimo', e.target.value)}
                        className="input"
                    />

                    <input
                        type="number"
                        step="0.01"
                        placeholder="Precio compra"
                        value={data.precio_compra}
                        onChange={e => setData('precio_compra', e.target.value)}
                        className="input"
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Precio venta"
                        value={data.precio_venta}
                        onChange={e => setData('precio_venta', e.target.value)}
                        className="input"
                    />

                    <button
                        disabled={processing}
                        className="col-span-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                    >
                        Guardar toner
                    </button>
                </form>

                {/* LISTADO */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">
                        Inventario
                    </h2>

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
        </AppLayout>
    );
}
