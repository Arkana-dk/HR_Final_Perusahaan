import type { UserRole} from '@/types/role';
import { rolePermissions } from '@/types/role';

export function hasPermission(
    userRole: UserRole,
    permission: keyof typeof rolePermissions.superadmin,
): boolean {
    return rolePermissions[userRole][permission];
}

export function redirectByRole(role: UserRole): string {
    const roleRoutes: Record<UserRole, string> = {
        superadmin: '/superadmin/dashboard',
        admin: '/admin/dashboard',
        manager: '/admin/dashboard',
        employee: '/employee/dashboard',
    };

    return roleRoutes[role];
}

export function isAuthorized(
    userRole: UserRole,
    allowedRoles: UserRole[],
): boolean {
    return allowedRoles.includes(userRole);
}
