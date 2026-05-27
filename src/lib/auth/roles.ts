import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import type { UserRole } from '@/types/auth';

const ROLE_PRIORITY: UserRole[] = ['viewer', 'operator', 'admin', 'super_admin'];

export function normalizeRole(role: unknown): UserRole | null {
  const normalized = String(role ?? '').toLowerCase();
  return ROLE_PRIORITY.includes(normalized as UserRole) ? (normalized as UserRole) : null;
}

export function pickHighestRole(roles: unknown[]): UserRole {
  return roles.reduce<UserRole>((highest, role) => {
    const normalized = normalizeRole(role);
    if (!normalized) return highest;

    return ROLE_PRIORITY.indexOf(normalized) > ROLE_PRIORITY.indexOf(highest)
      ? normalized
      : highest;
  }, 'viewer');
}

export async function getCurrentUserRole(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<UserRole> {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId);

  if (error) {
    console.error('[Auth] Error fetching user roles:', error);
    return 'viewer';
  }

  return pickHighestRole((data ?? []).map((row) => row.role));
}

export function canAccessAdmin(role: UserRole | null | undefined): boolean {
  return role === 'admin' || role === 'super_admin';
}