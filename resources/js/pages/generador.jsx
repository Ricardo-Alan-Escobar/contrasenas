import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import { RefreshCw, Copy, Check, Zap, Shield } from 'lucide-react';

export default function Generador() {
    const [password, setPassword] = useState("Kj#9mP@2xL$nQ8wR");
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    const generatePassword = useCallback(() => {
        let charset = "";
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) charset += "0123456789";
        if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

        if (charset === "") {
            setPassword("Selecciona al menos una opción");
            return;
        }

        let newPassword = "";
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const calculateStrength = () => {
        let strength = 0;
        if (length >= 8) strength += 20;
        if (length >= 12) strength += 15;
        if (length >= 16) strength += 15;
        if (includeUppercase) strength += 15;
        if (includeLowercase) strength += 10;
        if (includeNumbers) strength += 15;
        if (includeSymbols) strength += 10;
        return Math.min(strength, 100);
    };

    const strength = calculateStrength();

    const getStrengthLabel = () => {
        if (strength < 40) return { label: "Débil", color: "text-red-600" };
        if (strength < 70) return { label: "Media", color: "text-yellow-600" };
        return { label: "Fuerte", color: "text-green-600" };
    };

    const strengthInfo = getStrengthLabel();

    const getStrengthBarColor = () => {
        if (strength < 40) return "bg-red-600";
        if (strength < 70) return "bg-yellow-600";
        return "bg-green-600";
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Generador' }]}>
            <Head title="Generador de Contraseñas" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-6 h-6 text-green-600" />
                        <h1 className="text-2xl font-semibold text-white">
                            Generador de Contraseñas
                        </h1>
                    </div>
                    <p className="text-sm text-zinc-400">
                        Crea contraseñas seguras y aleatorias al instante
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Generator */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Password Display Card */}
                        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Tu Contraseña</h2>
                            <div className="flex items-center gap-3 p-5 bg-zinc-800 rounded-xl border border-zinc-700">
                                <code className="flex-1 font-mono text-2xl text-white break-all">
                                    {password}
                                </code>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={generatePassword}
                                        className="h-12 w-12 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition"
                                        title="Regenerar"
                                    >
                                        <RefreshCw className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={copyToClipboard}
                                        className={`h-12 w-12 flex items-center justify-center rounded-md transition ${
                                            copied 
                                                ? 'text-green-500 bg-green-500/10' 
                                                : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                                        }`}
                                        title="Copiar"
                                    >
                                        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Strength Indicator */}
                            <div className="mt-6 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-zinc-400">Fortaleza de la contraseña</span>
                                    <span className={`text-sm font-bold ${strengthInfo.color}`}>
                                        {strengthInfo.label} ({strength}%)
                                    </span>
                                </div>
                                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-500 ${getStrengthBarColor()}`}
                                        style={{ width: `${strength}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Options Card */}
                        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-white mb-6">Opciones de Generación</h2>
                            
                            {/* Length Slider */}
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-medium">Longitud de la contraseña</span>
                                    <span className="text-3xl font-bold text-green-600">{length}</span>
                                </div>
                                <input
                                    type="range"
                                    min="4"
                                    max="64"
                                    value={length}
                                    onChange={(e) => setLength(Number(e.target.value))}
                                    className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-green-600"
                                />
                                <div className="flex justify-between text-xs text-zinc-500">
                                    <span>Mínimo: 4</span>
                                    <span>Máximo: 64</span>
                                </div>
                            </div>

                            {/* Character Options */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-zinc-400 mb-3">Incluir caracteres:</h3>
                                
                                <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg hover:bg-zinc-800/70 transition">
                                    <div>
                                        <label htmlFor="uppercase" className="text-white font-medium cursor-pointer block">
                                            Mayúsculas
                                        </label>
                                        <span className="text-xs text-zinc-500">A B C D E F G H I J K L M</span>
                                    </div>
                                    <button
                                        id="uppercase"
                                        onClick={() => setIncludeUppercase(!includeUppercase)}
                                        className={`relative w-12 h-7 rounded-full transition-colors ${
                                            includeUppercase ? 'bg-green-700' : 'bg-zinc-600'
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                                                includeUppercase ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg hover:bg-zinc-800/70 transition">
                                    <div>
                                        <label htmlFor="lowercase" className="text-white font-medium cursor-pointer block">
                                            Minúsculas
                                        </label>
                                        <span className="text-xs text-zinc-500">a b c d e f g h i j k l m</span>
                                    </div>
                                    <button
                                        id="lowercase"
                                        onClick={() => setIncludeLowercase(!includeLowercase)}
                                        className={`relative w-12 h-7 rounded-full transition-colors ${
                                            includeLowercase ? 'bg-green-700' : 'bg-zinc-600'
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                                                includeLowercase ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg hover:bg-zinc-800/70 transition">
                                    <div>
                                        <label htmlFor="numbers" className="text-white font-medium cursor-pointer block">
                                            Números
                                        </label>
                                        <span className="text-xs text-zinc-500">0 1 2 3 4 5 6 7 8 9</span>
                                    </div>
                                    <button
                                        id="numbers"
                                        onClick={() => setIncludeNumbers(!includeNumbers)}
                                        className={`relative w-12 h-7 rounded-full transition-colors ${
                                            includeNumbers ? 'bg-green-700' : 'bg-zinc-600'
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                                                includeNumbers ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg hover:bg-zinc-800/70 transition">
                                    <div>
                                        <label htmlFor="symbols" className="text-white font-medium cursor-pointer block">
                                            Símbolos
                                        </label>
                                        <span className="text-xs text-zinc-500">! @ # $ % ^ & * ( ) _ +</span>
                                    </div>
                                    <button
                                        id="symbols"
                                        onClick={() => setIncludeSymbols(!includeSymbols)}
                                        className={`relative w-12 h-7 rounded-full transition-colors ${
                                            includeSymbols ? 'bg-green-700' : 'bg-zinc-600'
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                                                includeSymbols ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Generate Button */}
                            <button
                                onClick={generatePassword}
                                className="w-full mt-6 py-4 px-4 bg-green-800 hover:bg-green-700 cursor-pointer text-white font-semibold text-lg rounded-lg transition flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="h-5 w-5" />
                                Generar Nueva Contraseña
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Tips */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Security Tips Card */}
                        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Shield className="w-5 h-5 text-green-500" />
                                <h3 className="text-lg font-semibold text-white">Consejos de Seguridad</h3>
                            </div>
                            <ul className="space-y-4 text-sm text-zinc-400">
                                <li className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                                    <span className="text-green-600 text-lg">•</span>
                                    <span>Usa al menos <strong className="text-white">12 caracteres</strong> para máxima seguridad</span>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                                    <span className="text-green-600 text-lg">•</span>
                                    <span>Combina <strong className="text-white">mayúsculas, minúsculas, números y símbolos</strong></span>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                                    <span className="text-green-600 text-lg">•</span>
                                    <span><strong className="text-white">Nunca reutilices</strong> contraseñas entre diferentes cuentas</span>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                                    <span className="text-green-600 text-lg">•</span>
                                    <span>Cambia tus contraseñas <strong className="text-white">periódicamente</strong></span>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg">
                                    <span className="text-green-600 text-lg">•</span>
                                    <span>Evita usar información personal como nombres o fechas</span>
                                </li>
                            </ul>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-700/30 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Estadísticas</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Longitud:</span>
                                    <span className="text-white font-semibold">{length} caracteres</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Mayúsculas:</span>
                                    <span className={`font-semibold ${includeUppercase ? 'text-green-600' : 'text-zinc-600'}`}>
                                        {includeUppercase ? 'Sí' : 'No'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Minúsculas:</span>
                                    <span className={`font-semibold ${includeLowercase ? 'text-green-600' : 'text-zinc-600'}`}>
                                        {includeLowercase ? 'Sí' : 'No'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Números:</span>
                                    <span className={`font-semibold ${includeNumbers ? 'text-green-600' : 'text-zinc-600'}`}>
                                        {includeNumbers ? 'Sí' : 'No'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Símbolos:</span>
                                    <span className={`font-semibold ${includeSymbols ? 'text-green-600' : 'text-zinc-600'}`}>
                                        {includeSymbols ? 'Sí' : 'No'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}