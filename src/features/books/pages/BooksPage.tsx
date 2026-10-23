import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiErrorMessage } from '../../../shared/api/getApiErrorMessage';
import { ErrorBanner } from '../../../shared/components/ErrorBanner';
import type { Book } from '../../../shared/types/book';
import { BookModal } from '../components/BookModal';
import { BookTable } from '../components/BookTable';
import { BooksHeader } from '../components/BooksHeader';
import { useBooks } from '../hooks/useBooks';
import { bookService } from '../services/bookService';

const BooksPage = () => {
  const { books, loading, error, setError, reloadBooks } = useBooks();
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<Book>>({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const openCreate = () => {
    setCurrentBook({});
    setIsEditing(false);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEdit = (book: Book) => {
    setCurrentBook(book);
    setIsEditing(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      if (isEditing && currentBook.id) {
        await bookService.update(currentBook.id, currentBook as Book);
      } else {
        await bookService.create({
          id: Math.floor(Math.random() * 10000),
          title: currentBook.title ?? '',
          description: currentBook.description ?? '',
          pageCount: Number(currentBook.pageCount) || 0,
          publishDate: new Date().toISOString(),
        });
      }
      setIsModalOpen(false);
      reloadBooks();
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm('Delete this book?')) return;
    setError('');
    try {
      await bookService.delete(id);
      reloadBooks();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="space-y-6">
      <BooksHeader onAdd={openCreate} />
      {error && <ErrorBanner message={error} onRetry={reloadBooks} />}
      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading books...</div>
      ) : books.length > 0 ? (
        <BookTable books={books} onView={(book) => navigate(`/books/${book.id}`)} onEdit={openEdit} onDelete={remove} />
      ) : !error ? (
        <div className="rounded-xl border border-slate-200 bg-white py-12 text-center text-sm text-slate-500">
          No books found. Add the first one to get started.
        </div>
      ) : null}
      <BookModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        error={formError}
        book={currentBook}
        onChange={setCurrentBook}
        onSave={save}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default BooksPage;
