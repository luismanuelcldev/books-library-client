import { useEffect, useMemo, useState } from 'react';
import { getApiErrorMessage } from '../../../shared/api/getApiErrorMessage';
import type { Author } from '../../../shared/types/author';
import { authorService } from '../services/authorService';

export const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    authorService
      .getAll()
      .then((data) => {
        if (active) setAuthors(data);
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

  const reloadAuthors = () => {
    setLoading(true);
    setError('');
    setReloadKey((value) => value + 1);
  };

  const bookCounts = useMemo(() => {
    const counts = new Map<string, Set<number>>();

    authors.forEach((author) => {
      const key = `${author.firstName} ${author.lastName}`.trim().toLowerCase();
      const books = counts.get(key) ?? new Set<number>();
      if (author.idBook > 0) books.add(author.idBook);
      counts.set(key, books);
    });

    return counts;
  }, [authors]);

  const getBookCount = (author: Author) => {
    const key = `${author.firstName} ${author.lastName}`.trim().toLowerCase();
    return bookCounts.get(key)?.size ?? 0;
  };

  return { authors, loading, error, setError, reloadAuthors, getBookCount };
};
