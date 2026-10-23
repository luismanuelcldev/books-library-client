import { Edit, Eye, Trash2 } from 'lucide-react';
import type { Book } from '../../../shared/types/book';

interface BookTableProps {
  books: Book[];
  onView: (book: Book) => void;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export const BookTable = ({ books, onView, onEdit, onDelete }: BookTableProps) => (
  <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-x-auto">
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ID</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Title</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Description</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Pages</th>
          <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {books.map((book) => (
          <tr key={book.id} className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 text-sm text-slate-900">{book.id}</td>
            <td className="px-6 py-4 text-sm font-semibold text-slate-800">{book.title}</td>
            <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">{book.description}</td>
            <td className="px-6 py-4 text-sm text-slate-600">{book.pageCount}</td>
            <td className="px-6 py-4 text-right text-sm">
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={() => onView(book)}
                  className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  title="View details"
                  aria-label={`View details for ${book.title}`}
                >
                  <Eye className="h-4 w-4" />
                  <span>View details</span>
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(book)}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-red-600"
                  title="Edit book"
                  aria-label={`Edit ${book.title}`}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(book.id)}
                  className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                  title="Delete book"
                  aria-label={`Delete ${book.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
