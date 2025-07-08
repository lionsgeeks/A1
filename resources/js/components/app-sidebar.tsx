import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, FolderOpen, MessageSquare, Milestone } from 'lucide-react';
import AppLogo from './app-logo';

// const mainNavItems: NavItem[] = [
//     {
//         title: 'Dashboard',
//         href: '/dashboard',
//         icon: LayoutGrid,
//     },
// ];

const adminNavItems: NavItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
        icon: LayoutGrid,
    },
    {
        title: 'Projects',
        href: '/admin/projects',
        icon: FolderOpen,
    },
    {
        title: 'Messages',
        href: '/admin/messages',
        icon: MessageSquare,
    },
    {
        title: 'Milestones',
        href: '/admin/milestones',
        icon: Milestone,
    },

];


export function AppSidebar() {
    const page = usePage();
    const isAdminPage = page.url.startsWith('/admin');
    // const navItems = isAdminPage ? adminNavItems : mainNavItems;
    const logoHref = isAdminPage ? '/admin' : '/dashboard';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={logoHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={adminNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
