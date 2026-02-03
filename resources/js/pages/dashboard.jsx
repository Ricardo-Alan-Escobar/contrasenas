import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function Dashboard({ passwords = [] }) {
    const { data, setData, post, reset } = useForm({
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
            onSuccess: () => reset(),
        });
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Bóveda' }]}>
            <Head title="Bóveda" />

            <div className="p-6 space-y-6">

                {/* FORMULARIO */}
                <form onSubmit={submit} className="grid grid-cols-2 gap-4 max-w-3xl">

                    <input
                        placeholder="Nombre del sitio"
                        value={data.site_name}
                        onChange={e => setData('site_name', e.target.value)}
                    />

                    <input
                        placeholder="Sitio web"
                        value={data.site_url}
                        onChange={e => setData('site_url', e.target.value)}
                    />

                    <input
                        placeholder="Usuario o email"
                        value={data.username}
                        onChange={e => setData('username', e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />

                    <input
                        placeholder="Categoría"
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                    />

                    <textarea
                        placeholder="Notas"
                        value={data.notes}
                        onChange={e => setData('notes', e.target.value)}
                    />

                    <button className="col-span-2 bg-green-600 text-white p-2 rounded">
                        Guardar contraseña
                    </button>
                </form>

                {/* LISTADO */}
                <div className="space-y-3">
                    {passwords.map(p => (
                        <div key={p.id} className="border p-4 rounded">
                            <h3 className="font-semibold">{p.site_name}</h3>
                            <p className="text-sm text-zinc-400">{p.username}</p>
                        </div>
                    ))}
                </div>

            </div>
        </AppLayout>
    );
}
