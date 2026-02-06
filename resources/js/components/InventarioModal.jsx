import { useForm } from '@inertiajs/react';
import { Package, Tag, Palette, Hash, TrendingDown, DollarSign, Save, X, Ban } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function InventarioModal({ open, onClose, toner }) {
    const { data, setData, post, put, reset, processing } = useForm({
        modelo: '',
        marca: '',
        color: '',
        cantidad_inicial: '',
        stock_minimo: '',
        precio_compra: '',
        precio_venta: '',
    });

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

    function submit(e) {
        e.preventDefault();

        if (toner) {
            // EDITAR
            put(`/inventario/${toner.id}`, {
                onSuccess: () => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Toner actualizado',
                    });
                    reset();
                    onClose();
                },
            });
        } else {
            // CREAR
            post('/inventario', {
                onSuccess: () => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Toner registrado',
                    });
                    reset();
                    onClose();
                },
            });
        }
    }

    useEffect(() => {
        if (toner) {
            setData({
                modelo: toner.modelo || '',
                marca: toner.marca || '',
                color: toner.color || '',
                cantidad_inicial: toner.cantidad_inicial || '',
                stock_minimo: toner.stock_minimo || '',
                precio_compra: toner.precio_compra || '',
                precio_venta: toner.precio_venta || '',
            });
        }
    }, [toner]);

    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open]);

    function handleClose() {
        reset();
        onClose();
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-zinc-900 w-full max-w-lg rounded-xl p-6">
                
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-card-foreground flex items-center gap-2">
                        <Package className="w-6 h-6 text-green-500" />
                        {toner ? 'Editar toner' : 'Registrar toner'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                    >
                        <X size={40} className='hover:bg-zinc-800 rounded-md hover:p-2 p-2'/>
                    </button>
                </div>
                <p className="text-sm text-zinc-400 mb-2">
                    Agrega un nuevo toner al inventario
                </p>

                {/* FORM */}
                <form onSubmit={submit} className="space-y-5 py-4" autoComplete="off">
                    
                    <div className='space-y-2'>
                        <Label className="text-base font-medium text-card-foreground flex items-center gap-2">
                            Modelo
                        </Label>
                        <input
                            placeholder="Ej: HP 85A, Canon 052..."
                            className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                            value={data.modelo}
                            onChange={e => setData('modelo', e.target.value)}
                            required
                        />
                    </div>

                    <div className='space-y-2 space-x-6 flex'>
                        <div>
                        <Label className="text-base font-medium text-card-foreground flex items-center gap-2 mb-2">
                            <Tag className="w-5 h-5 text-green-500 " />
                            Marca
                        </Label>
                        <input
                            placeholder="Ej: HP, Canon, Brother..."
                            className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                            value={data.marca}
                            onChange={e => setData('marca', e.target.value)}
                            required
                        />
                        </div>
                        <div>
                         <Label className="text-base font-medium text-card-foreground flex items-center gap-2 mb-2">
                            <Palette className="w-5 h-5 text-green-500" />
                            Color
                        </Label>
                        <input
                            placeholder="Negro, Cyan, Magenta, Amarillo..."
                            className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                            value={data.color}
                            onChange={e => setData('color', e.target.value)}
                            required
                        />
                        </div>
                    </div>

                    <div className='space-y-2 space-x-6 flex'>
                        <div>
                        <Label className="text-base font-medium text-card-foreground flex items-center gap-2 mb-2">
                            Cantidad inicial
                        </Label>
                        <input
                            type="number"
                            placeholder="Cantidad de unidades"
                            className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                            value={data.cantidad_inicial}
                            onChange={e => setData('cantidad_inicial', e.target.value)}
                            required
                        />
                        </div>
                        <div>
                         <Label className="text-base font-medium text-card-foreground flex items-center gap-2 mb-2">
                            Stock mínimo
                        </Label>
                        <input
                            type="number"
                            placeholder="Nivel mínimo de alerta"
                            className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                            value={data.stock_minimo}
                            onChange={e => setData('stock_minimo', e.target.value)}
                            required
                        />
                        </div>
                    </div>

                    

                    <div className='space-y-2 flex space-x-6'>
                        <div>
                        <Label className="text-base font-medium text-card-foreground flex items-center gap-2 mb-2">
                            <DollarSign className="w-5 h-5 text-green-500" />
                            Precio de compra
                        </Label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                            value={data.precio_compra}
                            onChange={e => setData('precio_compra', e.target.value)}
                            required
                        />
                        </div>
                        <div>
                         <Label className="text-base font-medium text-card-foreground flex items-center gap-2 mb-2">
                            <DollarSign className="w-5 h-5 text-green-500" />
                            Precio de venta
                        </Label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                            value={data.precio_venta}
                            onChange={e => setData('precio_venta', e.target.value)}
                            required
                        />
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="col-span-2 flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-44 p-2 flex items-center justify-center text-sm bg-zinc-800 rounded-md hover:bg-zinc-700 transition cursor-pointer"
                        >
                            Cancelar <Ban className="inline-block ml-2" size={16} />
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-44 cursor-pointer p-2 flex items-center justify-center text-sm text-white bg-green-900 rounded-md hover:bg-green-700 transition"
                        >
                            Guardar <Save className="inline-block ml-2" size={16} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}