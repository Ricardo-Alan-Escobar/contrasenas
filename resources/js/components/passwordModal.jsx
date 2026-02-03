import { useForm } from '@inertiajs/react';
import { Tag, Save, X, Ban, Globe, User, LockKeyhole, ChartColumnStacked, FileText } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function PasswordModal({ open, onClose }) {
    const { data, setData, post, reset, processing } = useForm({
        site_name: '',
        site_url: '',
        username: '',
        password: '',
        category: '',
        notes: '',
    });

    function submit(e) {
        e.preventDefault();

        post('/passwords', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    }

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
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                    >
                        <X size={40} className='hover:bg-zinc-800 rounded-md hover:p-2 p-2'/>
                    </button>
                </div>
                <p className="text-sm text-zinc-400 mb-6 mt-2">Agrega una nueva credencial a tu bóveda segura</p>
                {/* FORM */}
                <form onSubmit={submit} className="space-y-5 py-4">

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
                        required
                    />
                    </div>

                     <div className='space-y-2'>
                        <Label htmlFor="name" className="text-base font-medium text-card-foreground flex items-center gap-2">
                        <LockKeyhole  className="w-5 h-5 text-green-500" />
                        Contraseña
                        </Label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="bg-secondary border-border focus:border-green-500 focus:ring-green-500 rounded-md w-full p-2"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        required
                    />
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
