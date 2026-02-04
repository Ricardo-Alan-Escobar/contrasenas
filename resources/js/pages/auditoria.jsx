import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { useMemo } from 'react'
import {
    ShieldCheck,
    ShieldAlert,
    AlertTriangle,
} from 'lucide-react'
import { useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function Auditoria({ passwords }) {

    function getStrength(password) {
        let score = 0
        if (password.length >= 8) score++
        if (/[A-Z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++

        if (score <= 1) return 'weak'
        if (score === 2) return 'medium'
        return 'strong'
    }

    const analysis = useMemo(() => {
        const weak = []
        const medium = []
        const strong = []

        passwords.forEach(p => {
            const level = getStrength(p.password)
            if (level === 'weak') weak.push(p)
            if (level === 'medium') medium.push(p)
            if (level === 'strong') strong.push(p)
        })

        const total = passwords.length
        const totalWeight = total * 3
        const score =
            total === 0
                ? 100
                : Math.round(
                    ((weak.length * 1 + medium.length * 2 + strong.length * 3) / totalWeight) * 100
                )

        return {
            weak,
            medium,
            strong,
            total,
            score,
            attention: weak.length + medium.length,
            secure: strong.length,
        }
    }, [passwords])

    const circumference = 2 * Math.PI * 56
    const progress = (analysis.score / 100) * circumference


        useEffect(() => {
    router.reload();
}, []);

    return (
        <AppLayout breadcrumbs={[{ title: 'Auditoría' }]}>
            <Head title="Auditoría de seguridad" />

            <div className="p-6 space-y-6">

                {/* HEADER */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-8">

                    {/* CIRCULAR SCORE */}
                    <div className="relative w-32 h-32">
                        <svg className="-rotate-90 w-32 h-32">
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                strokeWidth="12"
                                className="text-zinc-700"
                                stroke="currentColor"
                                fill="none"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray={`${progress} ${circumference}`}
                                className={
                                    analysis.score >= 80
                                        ? 'text-green-500'
                                        : analysis.score >= 60
                                        ? 'text-yellow-500'
                                        : 'text-red-500'
                                }
                                stroke="currentColor"
                                fill="none"
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-white">
                                {analysis.score}
                            </span>
                            <span className="text-xs text-zinc-400">/ 100</span>
                        </div>
                    </div>

                    {/* SUMMARY */}
                    <div className="flex-1 space-y-1">
                        <h2 className="text-xl font-semibold text-white">
                            Puntuación de seguridad
                        </h2>

                        <p className="text-zinc-400 text-sm">
                            {analysis.score >= 80
                                ? 'Tu seguridad es excelente'
                                : analysis.score >= 60
                                ? 'Buena, pero mejorable'
                                : 'Necesita atención urgente'}
                        </p>

                        <div className="flex items-center gap-4 mt-3 text-sm">
                            <div className="flex items-center gap-2 text-green-500">
                                <ShieldCheck size={16} />
                                {analysis.secure} seguras
                            </div>
                            <div className="flex items-center gap-2 text-yellow-500">
                                <ShieldAlert size={16} />
                                {analysis.attention} necesitan atención
                            </div>
                        </div>
                    </div>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-3 gap-4">
                    <StrengthCard
                        label="Contraseñas débiles"
                        value={analysis.weak.length}
                        total={analysis.total}
                        color="red"
                    />
                    <StrengthCard
                        label="Contraseñas medias"
                        value={analysis.medium.length}
                        total={analysis.total}
                        color="yellow"
                    />
                    <StrengthCard
                        label="Contraseñas fuertes"
                        value={analysis.strong.length}
                        total={analysis.total}
                        color="green"
                    />
                </div>

                {/* ISSUES */}
<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <AlertTriangle className="text-yellow-500" />
        Contraseñas que requieren acción
    </h3>

    {analysis.attention === 0 ? (
        <div className="flex items-center gap-3 text-green-500">
            <ShieldCheck />
            <span>Todo está seguro 🎉</span>
        </div>
    ) : (
        <div className="space-y-3">
            {[...analysis.weak, ...analysis.medium].slice(0, 5).map(p => {
                const isWeak = analysis.weak.find(w => w.id === p.id)

                return (
                    <div
                        key={p.id}
                        className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg border border-zinc-700"
                    >
                        {/* INFO */}
                        <div className="space-y-1">
                            <p className="text-white font-medium">
                                {p.site_name}
                            </p>
                            <p className="text-sm text-zinc-400">
                                {isWeak
                                    ? 'Contraseña débil'
                                    : 'Contraseña mejorable'}
                            </p>
                        </div>

                        {/* ACTION */}
                        <div className="flex items-center gap-3">
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                    isWeak
                                        ? 'bg-red-500/20 text-red-400'
                                        : 'bg-yellow-500/20 text-yellow-400'
                                }`}
                            >
                                {isWeak ? 'Alta prioridad' : 'Media prioridad'}
                            </span>

                            <a
                                href={`/dashboard?edit=${p.id}`}
                                className="text-sm px-3 py-1 rounded-md bg-zinc-700 hover:bg-zinc-600 transition text-white"
                            >
                                Editar
                            </a>
                        </div>
                    </div>
                )
            })}
        </div>
    )}
</div>


            </div>
        </AppLayout>
    )
}

/* COMPONENTE CARD */
function StrengthCard({ label, value, total, color }) {
    const percentage = total > 0 ? (value / total) * 100 : 0

    const colors = {
        red: 'bg-red-500',
        yellow: 'bg-yellow-500',
        green: 'bg-green-500',
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
                <span className="text-zinc-400">{label}</span>
                <span className="text-white font-medium">{value}</span>
            </div>

            <div className="h-2 w-full bg-zinc-700 rounded overflow-hidden">
                <div
                    className={`h-full transition-all ${colors[color]}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <p className="text-xs text-zinc-400">
                {value} de {total} contraseñas
            </p>
        </div>
    )
}
