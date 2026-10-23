import { axiosClient } from '../../../shared/api/axiosClient';
import type { Book } from '../../../shared/types/book';

export const bookService = {
  getAll: async (): Promise<Book[]> => {
    const response = await axiosClient.get<Book[]>('/books');
    return response.data;
  },

  getById: async (id: number): Promise<Book> => {
    const response = await axiosClient.get<Book>(`/books/${id}`);
    return response.data;
  },

  create: async (book: Book): Promise<Book> => {
    const response = await axiosClient.post<Book>('/books', book);
    return response.data;
  },

  update: async (id: number, book: Book): Promise<Book> => {
    const response = await axiosClient.put<Book>(`/books/${id}`, book);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/books/${id}`);
  },
};
