import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useMemo } from 'react';
import {
    Package,
    TrendingUp,
    DollarSign,
    AlertTriangle,
    BarChart3,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Reportes({ items }) {
    const stats = useMemo(() => {
        const totalItems = items.length;
        const totalStock = items.reduce((acc, t) => acc + t.cantidad_inicial, 0);
        const totalValue = items.reduce((acc, t) => acc + t.cantidad_inicial * t.precio_venta, 0);
        const totalCost = items.reduce((acc, t) => acc + t.cantidad_inicial * t.precio_compra, 0);
        
        const inStock = items.filter((t) => t.cantidad_inicial > t.stock_minimo).length;
        const lowStock = items.filter((t) => t.cantidad_inicial <= t.stock_minimo && t.cantidad_inicial > 0).length;
        const outOfStock = items.filter((t) => t.cantidad_inicial === 0).length;

        // Distribución por marca
        const brandCounts = {};
        items.forEach((t) => {
            brandCounts[t.marca] = (brandCounts[t.marca] || 0) + t.cantidad_inicial;
        });

        // Distribución por color
        const colorCounts = {};
        items.forEach((t) => {
            colorCounts[t.color] = (colorCounts[t.color] || 0) + t.cantidad_inicial;
        });

        return {
            totalItems,
            totalStock,
            totalValue,
            totalCost,
            inStock,
            lowStock,
            outOfStock,
            brandCounts,
            colorCounts,
            healthPercent: totalItems > 0 ? Math.round((inStock / totalItems) * 100) : 0,
        };
    }, [items]);

    const colorLabels = {
        'Negro': { label: 'Negro', color: 'bg-zinc-700' },
        'Cyan': { label: 'Cyan', color: 'bg-cyan-500' },
        'Magenta': { label: 'Magenta', color: 'bg-fuchsia-500' },
        'Amarillo': { label: 'Amarillo', color: 'bg-yellow-400' },
        'Tricolor': { label: 'Tricolor', color: 'bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-yellow-400' },
    };

    const maxBrandCount = Math.max(...Object.values(stats.brandCounts), 1);
    const maxColorCount = Math.max(...Object.values(stats.colorCounts), 1);

    return (
        <AppLayout breadcrumbs={[{ title: 'Reportes' }]}>
            <Head title="Reportes" />

            <div className="p-6 space-y-6">
                {/* Métricas Clave */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400 mb-1">Total de Referencias</p>
                                <p className="text-3xl font-bold text-white">{stats.totalItems}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-green-500/10">
                                <Package className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400 mb-1">Unidades en Stock</p>
                                <p className="text-3xl font-bold text-white">{stats.totalStock}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-green-500/10">
                                <TrendingUp className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                           <div>
                            <p className="text-sm text-zinc-400 mb-1">Valor del Inventario</p>
                            <p className="text-3xl font-bold text-white">
                                ${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                            <div className="p-3 rounded-xl bg-yellow-500/10">
                                <DollarSign className="w-6 h-6 text-yellow-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400 mb-1">Alertas de Stock</p>
                                <p className="text-3xl font-bold text-red-500">{stats.lowStock + stats.outOfStock}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-red-500/10">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Salud del Inventario */}
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <BarChart3 className="w-5 h-5 text-green-500" />
                            Salud del Inventario
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-zinc-400">Estado General</span>
                                    <span className="text-sm font-medium text-white">{stats.healthPercent}%</span>
                                </div>
                                <Progress value={stats.healthPercent} className="h-3" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                            <div className="text-center">
                                <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-white">{stats.inStock}</p>
                                <p className="text-sm text-zinc-400">En Stock</p>
                            </div>
                            <div className="text-center">
                                <div className="w-3 h-3 rounded-full bg-yellow-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-white">{stats.lowStock}</p>
                                <p className="text-sm text-zinc-400">Stock Bajo</p>
                            </div>
                            <div className="text-center">
                                <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-white">{stats.outOfStock}</p>
                                <p className="text-sm text-zinc-400">Agotados</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Gráficos de Distribución */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Por Marca */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white text-base">Stock por Marca</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {Object.entries(stats.brandCounts)
                                .sort(([, a], [, b]) => b - a)
                                .map(([brand, count]) => (
                                    <div key={brand} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white">{brand}</span>
                                            <span className="text-zinc-400">{count} uds.</span>
                                        </div>
                                        <Progress value={(count / maxBrandCount) * 100} className="h-2" />
                                    </div>
                                ))}
                            {Object.keys(stats.brandCounts).length === 0 && (
                                <p className="text-sm text-zinc-400 text-center py-4">Sin datos</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Por Color */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white text-base">Stock por Color</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {Object.entries(stats.colorCounts)
                                .sort(([, a], [, b]) => b - a)
                                .map(([color, count]) => (
                                    <div key={color} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="flex items-center gap-2 text-white">
                                                <div className={`w-3 h-3 rounded-full ${colorLabels[color]?.color || 'bg-gray-500'}`} />
                                                {colorLabels[color]?.label || color}
                                            </span>
                                            <span className="text-zinc-400">{count} uds.</span>
                                        </div>
                                        <Progress value={(count / maxColorCount) * 100} className="h-2" />
                                    </div>
                                ))}
                            {Object.keys(stats.colorCounts).length === 0 && (
                                <p className="text-sm text-zinc-400 text-center py-4">Sin datos</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Lista de Alertas de Stock Bajo */}
                {(stats.lowStock > 0 || stats.outOfStock > 0) && (
                    <Card className="bg-zinc-900 border-zinc-800 ">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                Toners que Requieren Atención
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {items
                                    .filter((t) => t.cantidad_inicial === 0 || t.cantidad_inicial <= t.stock_minimo)
                                    .sort((a, b) => a.cantidad_inicial - b.cantidad_inicial)
                                    .map((toner) => (
                                        <div
                                            key={toner.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${
                                                        toner.cantidad_inicial === 0 ? 'bg-red-500' : 'bg-yellow-500'
                                                    }`}
                                                />
                                                <div>
                                                    <p className="font-medium text-white">{toner.modelo}</p>
                                                    <p className="text-sm text-zinc-400">{toner.marca} - {toner.color}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold ${toner.cantidad_inicial === 0 ? 'text-red-500' : 'text-yellow-500'}`}>
                                                    {toner.cantidad_inicial} uds.
                                                </p>
                                                <p className="text-xs text-zinc-400">mín: {toner.stock_minimo}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}