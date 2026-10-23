import { useEffect, useState } from 'react';
import { getApiErrorMessage } from '../../../shared/api/getApiErrorMessage';
import type { Book } from '../../../shared/types/book';
import { bookService } from '../services/bookService';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    bookService
      .getAll()
      .then((data) => {
        if (active) setBooks(data);
      })
      .catch((err) => {
        if (active) setError(getApiErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const reloadBooks = () => {
    setLoading(true);
    setError('');
    setReloadKey((value) => value + 1);
  };

  return { books, loading, error, setError, reloadBooks };
};
