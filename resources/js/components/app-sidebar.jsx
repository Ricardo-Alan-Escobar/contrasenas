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
import { BookOpen, Folder, Star, Key, TriangleAlert, TrendingUp, Search } from 'lucide-react';
import AppLogo from './app-logo';
import SearchBar from '@/components/SearchBar';

const mainNavItems = [
    {
        title: 'Bóveda',
        href: dashboard(),
        icon: Key,
    },
    {
        title: 'Favoritos',
        href: dashboard(),
        icon: Star,
    },
    {
        title: 'Auditoria',
        href: dashboard(),
        icon: TriangleAlert,
    },
     {
        title: 'Generador',
        href: dashboard(),
        icon: TrendingUp,
    },
];

const footerNavItems = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
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
                <NavMain items={mainNavItems} />
             
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
