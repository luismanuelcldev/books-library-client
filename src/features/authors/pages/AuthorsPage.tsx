import { useState } from 'react';
import type { FormEvent } from 'react';
import { getApiErrorMessage } from '../../../shared/api/getApiErrorMessage';
import { ErrorBanner } from '../../../shared/components/ErrorBanner';
import type { Author } from '../../../shared/types/author';
import { AuthorModal } from '../components/AuthorModal';
import { AuthorTable } from '../components/AuthorTable';
import { AuthorsHeader } from '../components/AuthorsHeader';
import { useAuthors } from '../hooks/useAuthors';
import { authorService } from '../services/authorService';

const AuthorsPage = () => {
  const { authors, loading, error, setError, reloadAuthors, getBookCount } = useAuthors();
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState<Partial<Author>>({});
  const [isEditing, setIsEditing] = useState(false);

  const openCreate = () => {
    setCurrentAuthor({});
    setIsEditing(false);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEdit = (author: Author) => {
    setCurrentAuthor(author);
    setIsEditing(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      if (isEditing && currentAuthor.id) {
        await authorService.update(currentAuthor.id, currentAuthor as Author);
      } else {
        await authorService.create({
          id: Math.floor(Math.random() * 10000),
          idBook: Number(currentAuthor.idBook) || 1,
          firstName: currentAuthor.firstName ?? '',
          lastName: currentAuthor.lastName ?? '',
        });
      }
      setIsModalOpen(false);
      reloadAuthors();
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm('Delete this author?')) return;
    setError('');
    try {
      await authorService.delete(id);
      reloadAuthors();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="space-y-6">
      <AuthorsHeader onAdd={openCreate} />
      {error && <ErrorBanner message={error} onRetry={reloadAuthors} />}
      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading authors...</div>
      ) : authors.length > 0 ? (
        <AuthorTable authors={authors} getBookCount={getBookCount} onEdit={openEdit} onDelete={remove} />
      ) : !error ? (
        <div className="rounded-xl border border-slate-200 bg-white py-12 text-center text-sm text-slate-500">
          No authors found. Add the first one to get started.
        </div>
      ) : null}
      <AuthorModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        error={formError}
        author={currentAuthor}
        onChange={setCurrentAuthor}
        onSave={save}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AuthorsPage;
