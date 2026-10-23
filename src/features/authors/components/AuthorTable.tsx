import { Edit, Trash2 } from 'lucide-react';
import type { Author } from '../../../shared/types/author';

interface AuthorTableProps {
  authors: Author[];
  getBookCount: (author: Author) => number;
  onEdit: (author: Author) => void;
  onDelete: (id: number) => void;
}

export const AuthorTable = ({ authors, getBookCount, onEdit, onDelete }: AuthorTableProps) => (
  <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-x-auto">
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ID</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">First Name</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Last Name</th>
          <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Published Books</th>
          <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {authors.map((author) => (
          <tr key={author.id} className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 text-sm text-slate-900">{author.id}</td>
            <td className="px-6 py-4 text-sm font-semibold text-slate-800">{author.firstName}</td>
            <td className="px-6 py-4 text-sm font-semibold text-slate-800">{author.lastName}</td>
            <td className="px-6 py-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                  {getBookCount(author)}
                </span>
                <span className="text-xs text-slate-500">Book #{author.idBook}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-right text-sm">
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(author)}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-red-600"
                  title="Edit author"
                  aria-label={`Edit ${author.firstName} ${author.lastName}`}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(author.id)}
                  className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                  title="Delete author"
                  aria-label={`Delete ${author.firstName} ${author.lastName}`}
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
