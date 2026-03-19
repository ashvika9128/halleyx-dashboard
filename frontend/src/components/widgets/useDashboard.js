import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

export const useDashboard = () =>
  useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard');
      return data.data;
    },
  });

export const useSaveDashboard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => api.put('/dashboard', body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['dashboard'] }),
  });
};