import { useForm } from '@inertiajs/react';
import { Tag, Save, X, Ban, Globe, User, LockKeyhole, ChartColumnStacked, FileText, Eye, EyeClosed, Copy, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useState, useEffect  } from 'react';
import Swal from 'sweetalert2';


export default function PasswordModal({ open, onClose, password }) {
    const { data, setData, post, put, reset, processing } = useForm({
        site_name: '',
        site_url: '',
        username: '',
        password: '',
        category: '',
        notes: '',
    });

    function submit(e) {
    e.preventDefault();

    if (password) {
        // EDITAR
        put(`/passwords/${password.id}`, {
            method: 'put',
            onSuccess: () => {
                Toast.fire({
                    icon: 'success',
                    title: 'Contraseña actualizada',
                });
                reset();
                onClose();
            },
        });
    } else {
        // CREAR
        post('/passwords', {
            onSuccess: () => {
                Toast.fire({
                    icon: 'success',
                    title: 'Contraseña guardada',
                });
                reset();
                onClose();
            },
        });
    }
}


                function getStrength(password) {
                let score = 0;
                
                if (password.length >= 8) score++;
                if (/[A-Z]/.test(password)) score++;
                if (/[0-9]/.test(password)) score++;
                if (/[^A-Za-z0-9]/.test(password)) score++;
                
                if (score <= 1) return { label: 'Débil', value: 25, color: 'bg-red-500' };
                if (score === 2) return { label: 'Media', value: 50, color: 'bg-yellow-500' };
                if (score === 3) return { label: 'Buena', value: 75, color: 'bg-green-500' };
                
                return { label: 'Fuerte', value: 100, color: 'bg-green-600' };
            }
            
            const [showPassword, setShowPassword] = useState(false);
            const [copied, setCopied] = useState(false);
            const strength = getStrength(data.password);
            
            useEffect(() => {
                if (!open) {
                    reset();
                    setShowPassword(false);
                    setCopied(false);
                }
            }, [open]);
            
            
            function handleClose() {
                reset();
                setShowPassword(false);
                setCopied(false);
                onClose();
            }

            const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            background: '#18181b', // zinc-900
            color: '#fff',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });

useEffect(() => {
    if (password) {
        setData({
            site_name: password.site_name || '',
            site_url: password.site_url || '',
            username: password.username || '',
            password: password.password || '',
            category: password.category || '',
            notes: password.notes || '',
        });
    }
}, [password]);
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            <div className="bg-zinc-900 w-full max-w-lg rounded-xl p-6 ">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-card-foreground">
                        Nueva contraseña
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                    >
                        <X size={40} className='hover:bg-zinc-800 rounded-md hover:p-2 p-2'/>
                    </button>
                </div>
                <p className="text-sm text-zinc-400 mb-4">Agrega una nueva credencial a tu bóveda segura</p>
                {/* FORM */}
                <form onSubmit={submit} className="space-y-2" autoComplete="off">

                    <div className='space-y-2'>
                        <Label htmlFor="name" className="text-base font-medium text-card-foreground flex items-center gap-2">
                        <Tag className="w-5 h-5 text-green-500" />
                        Nombre del sitio
                        </Label>
                        <input
                        placeholder="Ej: Google, Netflix, Neubox..."
                        className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                        value={data.site_name}
                        onChange={e => setData('site_name', e.target.value)}
                        required
                    />
                    </div>
                    
                    <div className='space-y-2'>
                        <Label htmlFor="name" className="text-base font-medium text-card-foreground flex items-center gap-2">
                        <Globe className="w-5 h-5 text-green-500" />
                        Sitio web
                        </Label>
                    <input
                        placeholder="https://www.ejemplo.com"
                        className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                        value={data.site_url}
                        onChange={e => setData('site_url', e.target.value)}
                    />
                </div>

                 <div className='space-y-2'>
                    <Label htmlFor="name" className="text-base font-medium text-card-foreground flex items-center gap-2">
                        <User className="w-5 h-5 text-green-500" />
                        Usuario o email
                        </Label>
                    <input
                        placeholder="usuario@email.com"
                        className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                        value={data.username}
                        onChange={e => setData('username', e.target.value)}
                        autoComplete="off"
                        required
                    />
                    </div>



                     <div className="space-y-2">

                     <Label className="flex items-center gap-2 text-base font-medium">
                         <LockKeyhole className="w-5 h-5 text-green-500" />
                         Contraseña
                     </Label>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2 pr-20"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute cursor-pointer right-10 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                        >
                            {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                navigator.clipboard.writeText(data.password);
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Contraseña copiada',
                                });
                                setCopied(true);
                                setTimeout(() => setCopied(false), 1500);
                            }}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition
                                ${copied ? 'text-green-500' : 'text-zinc-400 hover:text-white'}
                            `}
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>

                    </div>

                    {data.password && (
                        <div className="space-y-1">
                             <p className="text-xs text-zinc-400 flex justify-between">
                                Fortaleza: <span className="font-medium">{strength.label}</span>
                            </p>
                            <div className="h-1.5 w-full bg-zinc-700 rounded overflow-hidden">
                                <div
                                    className={`h-full transition-all ${strength.color}`}
                                    style={{ width: `${strength.value}%` }}
                                />
                            </div>

                        </div>
                    )}
                </div>



                    <div className='space-y-2'>
                        <Label htmlFor="name" className="text-base font-medium text-card-foreground flex items-center gap-2">
                        <ChartColumnStacked className="w-5 h-5 text-green-500" />
                        Categoría
                        </Label>
                    <input
                        placeholder="Social, Trabajo, Bancaria..."
                        className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                    />
                    </div>

                     <div className='space-y-2'>
                           <Label htmlFor="name" className="text-base font-medium text-card-foreground flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-500" />
                        Notas (Opcional)
                        </Label>
                    <textarea
                        placeholder="Agrega notas adicionales..."
                        className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2 resize-none"
                        value={data.notes}
                        onChange={e => setData('notes', e.target.value)}
                    />
                    </div>

                    {/* ACTIONS */}
                    <div className="col-span-2 flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
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
