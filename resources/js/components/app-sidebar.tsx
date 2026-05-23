import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    BookOpen,
    Boxes,
    Briefcase,
    Building2,
    CalendarDays,
    ClipboardCheck,
    ClipboardList,
    Clock,
    FileText,
    Folder,
    FolderOpen,
    GraduationCap,
    LayoutGrid,
    Layers,
    ShieldCheck,
    Tag,
    Target,
    UserPlus,
    Users,
    Wallet,
} from 'lucide-react';
import { useMemo } from 'react';
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
import type { NavItem, NavSection } from '@/types';
import AppLogo from './app-logo';

const moduleHref = (slug: string) => `/modules/${slug}`;
type PageProps = {
    auth?: {
        user?: {
            role?: string | null;
        } | null;
        hasEmployeeProfile?: boolean;
    } | null;
};

const superadminOnlyModules = new Set([
    'organization',
    'payroll-periods',
    'salary-components',
    'payslips',
    'audit-logs',
]);

const navSections: NavSection[] = [
    {
        label: 'Overview',
        items: [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ],
    },
    {
        label: 'Self Service',
        items: [
            {
                title: 'My Attendance',
                href: '/employee/attendance',
                icon: ClipboardList,
            },
            {
                title: 'My Leave Requests',
                href: '/employee/leave-requests',
                icon: CalendarDays,
            },
            {
                title: 'My Overtime',
                href: '/employee/overtime',
                icon: ClipboardCheck,
            },
            {
                title: 'My Reimburse',
                href: '/employee/reimburse',
                icon: Wallet,
            },
        ],
    },
    {
        label: 'Core HR',
        items: [
            {
                title: 'Employee Master',
                href: moduleHref('employees'),
                icon: Users,
            },
            {
                title: 'Organization',
                href: moduleHref('organization'),
                icon: Building2,
            },
            {
                title: 'Contracts',
                href: moduleHref('contracts'),
                icon: FileText,
            },
            {
                title: 'Documents',
                href: moduleHref('documents'),
                icon: FolderOpen,
            },
            {
                title: 'Assets',
                href: moduleHref('assets'),
                icon: Boxes,
            },
        ],
    },
    {
        label: 'Attendance',
        items: [
            {
                title: 'Attendance Logs',
                href: moduleHref('attendance'),
                icon: ClipboardList,
            },
            {
                title: 'Shifts',
                href: moduleHref('shifts'),
                icon: Clock,
            },
            {
                title: 'Schedules',
                href: moduleHref('schedules'),
                icon: CalendarDays,
            },
            {
                title: 'Overtime',
                href: moduleHref('overtime'),
                icon: ClipboardCheck,
            },
        ],
    },
    {
        label: 'Leave',
        items: [
            {
                title: 'Leave Requests',
                href: moduleHref('leave-requests'),
                icon: CalendarDays,
            },
            {
                title: 'Leave Types',
                href: moduleHref('leave-types'),
                icon: Tag,
            },
        ],
    },
    {
        label: 'Payroll',
        items: [
            {
                title: 'Payroll Periods',
                href: moduleHref('payroll-periods'),
                icon: Wallet,
            },
            {
                title: 'Salary Components',
                href: moduleHref('salary-components'),
                icon: Layers,
            },
            {
                title: 'Payslips',
                href: moduleHref('payslips'),
                icon: FileText,
            },
            {
                title: 'Reimburse',
                href: '/modules/reimburse',
                icon: Wallet,
            },
        ],
    },
    {
        label: 'Performance',
        items: [
            {
                title: 'KPI / OKR',
                href: moduleHref('kpi-okr'),
                icon: Target,
            },
            {
                title: 'Appraisals',
                href: moduleHref('appraisals'),
                icon: ClipboardCheck,
            },
            {
                title: 'Training',
                href: moduleHref('training'),
                icon: GraduationCap,
            },
        ],
    },
    {
        label: 'Recruitment',
        items: [
            {
                title: 'Job Posts',
                href: moduleHref('job-posts'),
                icon: Briefcase,
            },
            {
                title: 'Candidates',
                href: moduleHref('candidates'),
                icon: UserPlus,
            },
            {
                title: 'Interviews',
                href: moduleHref('interviews'),
                icon: ClipboardList,
            },
        ],
    },
    {
        label: 'Reports',
        items: [
            {
                title: 'Analytics',
                href: moduleHref('analytics'),
                icon: BarChart3,
            },
            {
                title: 'Audit Logs',
                href: moduleHref('audit-logs'),
                icon: ShieldCheck,
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
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
    const { auth } = usePage<PageProps>().props;
    const role = auth?.user?.role ?? 'employee';
    const hasEmployeeProfile = auth?.hasEmployeeProfile ?? role === 'employee';

    const filteredSections = useMemo(() => {
        const isModuleRestricted = (href: unknown) => {
            if (!href) return false;
            const hrefValue: string =
                typeof href === 'string'
                    ? href
                    : typeof (href as { url?: string }).url === 'string'
                      ? ((href as { url?: string }).url ?? '')
                      : '';

            if (!hrefValue.startsWith('/modules/')) return false;
            const slug = hrefValue.replace('/modules/', '');
            return superadminOnlyModules.has(slug);
        };

        return navSections
            .map((section) => ({
                ...section,
                items: section.items.filter((item) => {
                    if (
                        section.label === 'Self Service' &&
                        !hasEmployeeProfile
                    ) {
                        return false;
                    }

                    if (role === 'superadmin') return true;
                    if (role === 'admin' || role === 'manager') {
                        return !isModuleRestricted(item.href);
                    }
                    return !String(item.href).startsWith('/modules/');
                }),
            }))
            .filter((section) => section.items.length > 0);
    }, [hasEmployeeProfile, role]);

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

            <SidebarContent>
                <NavMain sections={filteredSections} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
