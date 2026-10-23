import { Plus } from 'lucide-react';

interface BooksHeaderProps {
  onAdd: () => void;
}

export const BooksHeader = ({ onAdd }: BooksHeaderProps) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Books Management</h1>
      <p className="text-sm text-slate-500">Manage catalog library books efficiently.</p>
    </div>
    <button
      type="button"
      onClick={onAdd}
      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
    >
      <Plus className="h-4 w-4" />
      <span>Add Book</span>
    </button>
  </div>
);
