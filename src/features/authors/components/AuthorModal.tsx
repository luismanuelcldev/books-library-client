import type { FormEvent } from 'react';
import type { Author } from '../../../shared/types/author';

interface AuthorModalProps {
  isOpen: boolean;
  isEditing: boolean;
  isSubmitting: boolean;
  error?: string;
  author: Partial<Author>;
  onChange: (author: Partial<Author>) => void;
  onSave: (event: FormEvent) => void;
  onClose: () => void;
}

export const AuthorModal = ({
  isOpen,
  isEditing,
  isSubmitting,
  error,
  author,
  onChange,
  onSave,
  onClose,
}: AuthorModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">{isEditing ? 'Edit Author' : 'Add New Author'}</h2>
        <form onSubmit={onSave} className="space-y-4">
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="author-first-name">
              First Name
            </label>
            <input
              id="author-first-name"
              type="text"
              required
              disabled={isSubmitting}
              value={author.firstName ?? ''}
              onChange={(event) => onChange({ ...author, firstName: event.target.value })}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="author-last-name">
              Last Name
            </label>
            <input
              id="author-last-name"
              type="text"
              required
              disabled={isSubmitting}
              value={author.lastName ?? ''}
              onChange={(event) => onChange({ ...author, lastName: event.target.value })}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="author-book-id">
              Associated Book ID
            </label>
            <input
              id="author-book-id"
              type="number"
              min={1}
              required
              disabled={isSubmitting}
              value={author.idBook ?? ''}
              onChange={(event) => onChange({ ...author, idBook: Number(event.target.value) })}
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
