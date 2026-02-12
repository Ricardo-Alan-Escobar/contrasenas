import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, Star, Key, TriangleAlert, TrendingUp, Package, OctagonAlert, ChartColumn } from 'lucide-react';
import AppLogo from './app-logo';
import SearchBar from '@/components/SearchBar';

const mainNavItems = [
    {
        title: 'Bóveda',
        href: dashboard(),
        icon: Key,
    },
    {
        title: 'Auditoria',
        href: '/auditoria',
        icon: TriangleAlert,
    },
    {
        title: 'Generador',
        href: '/generador',
        icon: TrendingUp,
    },
];

const secondaryNavItems = [
    {
        title: 'Inventario',
        href: '/inventario',
        icon: Package,
    },
    {
        title: 'Stok Bajo',
        href: '/stokbajo',
        icon: OctagonAlert,
    },
    {
        title: 'Reportes',
        href: '/reportes',
        icon: ChartColumn,
    },
];

const footerNavItems = [
    {
        title: 'Documentación',
        href: 'https://github.com/Ricardo-Alan-Escobar/contrasenas',
        icon: Folder,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild> 
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <div className="my-2 border-t border-zinc-800" />
            <SidebarContent>
                <SearchBar />
                
                {/* Primer menú */}
                <NavMain items={mainNavItems} title="PRINCIPAL" />
                
                {/* Segundo menú con título diferente */}
                <NavMain items={secondaryNavItems} title="INVENTARIO" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}