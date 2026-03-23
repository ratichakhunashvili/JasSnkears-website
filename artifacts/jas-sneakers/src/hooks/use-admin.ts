import { useCreateProduct, useUpdateProduct, useDeleteProduct } from '@workspace/api-client-react';
import { useAuth } from '@/lib/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export function useAdminMutations() {
  const { token, logout } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const requestInit = token ? { headers: { 'x-admin-key': token } } : {};

  const handleAuthError = (error: any) => {
    if (error?.error === 'Unauthorized' || error?.status === 401) {
      logout();
      toast({ variant: 'destructive', title: 'Session expired', description: 'Please log in again.' });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: error?.error || 'An unexpected error occurred.' });
    }
  };

  const createMutation = useCreateProduct({
    request: requestInit,
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/products'] });
        toast({ title: 'Product created successfully' });
      },
      onError: handleAuthError,
    },
  });

  const updateMutation = useUpdateProduct({
    request: requestInit,
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/products'] });
        toast({ title: 'Product updated successfully' });
      },
      onError: handleAuthError,
    },
  });

  const deleteMutation = useDeleteProduct({
    request: requestInit,
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/products'] });
        toast({ title: 'Product deleted successfully' });
      },
      onError: handleAuthError,
    },
  });

  return {
    createProduct: createMutation,
    updateProduct: updateMutation,
    deleteProduct: deleteMutation,
  };
}
