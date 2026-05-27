import { useAuth } from '../contexts/AuthContext';

export const useAuthGuard = () => {
  return useAuth();
};
