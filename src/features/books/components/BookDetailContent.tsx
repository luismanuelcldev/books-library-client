import { BookOpen, Calendar, FileText, Users } from 'lucide-react';
import type { Book } from '../../../shared/types/book';

interface BookDetailContentProps {
  book: Book;
}

export const BookDetailContent = ({ book }: BookDetailContentProps) => {
  const publishDate = book.publishDate
    ? new Date(book.publishDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not available';

  return (
    <>
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Book #{book.id}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">{book.title}</h1>
          </div>
          <div className="rounded-xl bg-red-50 p-3 text-red-600">
            <BookOpen className="h-7 w-7" />
          </div>
        </div>
        <p className="mt-5 whitespace-pre-line text-slate-600">{book.description}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
            <FileText className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Pages</p>
              <p className="font-semibold text-slate-900">{book.pageCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
            <Calendar className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Published</p>
              <p className="font-semibold text-slate-900">{publishDate}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-red-600" />
          <h2 className="text-xl font-bold text-slate-900">Authors</h2>
        </div>
        {book.authors && book.authors.length > 0 ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {book.authors.map((author) => (
              <div key={author.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">
                  {author.firstName} {author.lastName}
                </p>
                <p className="mt-1 text-xs text-slate-500">Author #{author.id}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500">No authors linked to this book.</p>
        )}
      </section>
    </>
  );
};
