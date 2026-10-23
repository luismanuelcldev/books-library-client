import { useEffect, useState } from 'react';
import { getApiErrorMessage } from '../../../shared/api/getApiErrorMessage';
import type { Book } from '../../../shared/types/book';
import { bookService } from '../services/bookService';

export const useBookDetail = (bookId: number) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!Number.isInteger(bookId) || bookId <= 0) {
        if (active) {
          setError('Invalid book ID.');
          setLoading(false);
        }
        return;
      }

      try {
        const data = await bookService.getById(bookId);
        if (active) setBook(data);
      } catch (err) {
        if (active) setError(getApiErrorMessage(err));
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [bookId, reloadKey]);

  const retry = () => {
    setBook(null);
    setError('');
    setLoading(true);
    setReloadKey((value) => value + 1);
  };

  return { book, loading, error, retry };
};
