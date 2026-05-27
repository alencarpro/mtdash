import { supabase } from '../lib/supabase/client';
import { UserRole, UserProfile } from '../types/auth';
import { getCurrentUserRole } from '../lib/auth/roles';

export const authService = {
  async getCurrentProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, active')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('[AuthService] Error fetching profile:', error);
    }

    const role = await getCurrentUserRole(supabase, userId);
    const profile = data as { id: string; full_name: string | null; active: boolean | null } | null;

    return {
      id: profile?.id ?? userId,
      full_name: profile?.full_name ?? null,
      active: profile?.active ?? true,
      role: role as UserRole,
    };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};
