import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as authApi from '../api/auth';
import { useAuthStore } from '../store/authStore';

export function useLogin() {
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore();

  return useMutation({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (data) => {
      setTokens(data.tokens.access, data.tokens.refresh);
      setUser(data.user);
      toast.success(`Welcome back, ${data.user.full_name || 'User'}!`);
      navigate('/dashboard');
    },
    onError: (error) => {
      const errors = error.response?.data;
      const msg =
        errors?.email?.[0] ||
        errors?.password?.[0] ||
        errors?.non_field_errors?.[0] ||
        errors?.detail ||
        'Login failed. Please check your credentials.';
      toast.error(msg);
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore();

  return useMutation({
    mutationFn: (data) => authApi.register(data),
    onSuccess: (data) => {
      setTokens(data.tokens.access, data.tokens.refresh);
      setUser(data.user);
      toast.success(`Welcome, ${data.user.full_name || 'User'}!`);
      navigate('/dashboard');
    },
    onError: (error) => {
      const errors = error.response?.data;
      const msg =
        errors?.email?.[0] ||
        errors?.password?.[0] ||
        errors?.full_name?.[0] ||
        errors?.non_field_errors?.[0] ||
        errors?.detail ||
        'Registration failed. Please try again.';
      toast.error(msg);
    },
  });
}

export function useMe() {
  const { isAuthenticated, setUser, refreshToken, setAccessToken } = useAuthStore();

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      if (!useAuthStore.getState().accessToken && refreshToken) {
        try {
          const data = await authApi.refreshToken(refreshToken);
          setAccessToken(data.access);
        } catch {
          useAuthStore.getState().logout();
          throw new Error('Session expired');
        }
      }
      const user = await authApi.getMe();
      setUser(user);
      return user;
    },
    enabled: isAuthenticated,
    retry: false,
  });
}
