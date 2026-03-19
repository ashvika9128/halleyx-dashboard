import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

export const useOrders = (dateRange = 'all') =>
  useQuery({
    queryKey: ['orders', dateRange],
    queryFn: async () => {
      const { data } = await api.get(`/orders?dateRange=${dateRange}`);
      return data.data;
    },
  });

export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => api.post('/orders', body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });
};

export const useUpdateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }) => api.put(`/orders/${id}`, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });
};

export const useDeleteOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/orders/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });
};