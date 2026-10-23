import type { FormEvent } from 'react';
import type { Book } from '../../../shared/types/book';

interface BookModalProps {
  isOpen: boolean;
  isEditing: boolean;
  isSubmitting: boolean;
  error?: string;
  book: Partial<Book>;
  onChange: (book: Partial<Book>) => void;
  onSave: (event: FormEvent) => void;
  onClose: () => void;
}

export const BookModal = ({
  isOpen,
  isEditing,
  isSubmitting,
  error,
  book,
  onChange,
  onSave,
  onClose,
}: BookModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
        <form onSubmit={onSave} className="space-y-4">
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="book-title">
              Title
            </label>
            <input
              id="book-title"
              type="text"
              required
              disabled={isSubmitting}
              value={book.title ?? ''}
              onChange={(event) => onChange({ ...book, title: event.target.value })}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="book-description">
              Description
            </label>
            <textarea
              id="book-description"
              rows={3}
              disabled={isSubmitting}
              value={book.description ?? ''}
              onChange={(event) => onChange({ ...book, description: event.target.value })}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="book-pages">
              Page Count
            </label>
            <input
              id="book-pages"
              type="number"
              min={1}
              required
              disabled={isSubmitting}
              value={book.pageCount ?? ''}
              onChange={(event) => onChange({ ...book, pageCount: Number(event.target.value) })}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-red-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border rounded-lg text-sm disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm disabled:opacity-60"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
