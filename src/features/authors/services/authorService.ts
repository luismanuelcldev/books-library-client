import { axiosClient } from '../../../shared/api/axiosClient';
import type { Author } from '../../../shared/types/author';

export const authorService = {
  getAll: async (): Promise<Author[]> => {
    const response = await axiosClient.get<Author[]>('/authors');
    return response.data;
  },

  getById: async (id: number): Promise<Author> => {
    const response = await axiosClient.get<Author>(`/authors/${id}`);
    return response.data;
  },

  create: async (author: Author): Promise<Author> => {
    const response = await axiosClient.post<Author>('/authors', author);
    return response.data;
  },

  update: async (id: number, author: Author): Promise<Author> => {
    const response = await axiosClient.put<Author>(`/authors/${id}`, author);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/authors/${id}`);
  },
};
