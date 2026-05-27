export type UserRole = 'viewer' | 'operator' | 'admin' | 'super_admin';

export interface UserProfile {
  id: string;
  full_name: string | null;
  role: UserRole;
  active: boolean;
}

export interface AuthSession {
  user: any | null;
  profile: UserProfile | null;
  isLoading: boolean;
}
