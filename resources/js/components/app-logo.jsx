import AppLogoIcon from './app-logo-icon';
import { Shield } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-10 items-center bg-zinc-800 justify-center rounded-md  text-sidebar-primary-foreground">
                <Shield className='text-green-500'/> 
            </div>
            <div className="ml-1 grid flex-1 text-left text-base">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    AppContra
                </span>
                <span className="mb-0.5 truncate leading-tight text-xs text-sidebar-secondary-foreground text-zinc-400">
                    Gestor de Contraseñas
                </span>
            </div>
        </>
    );
}
