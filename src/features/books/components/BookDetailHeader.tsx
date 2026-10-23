import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookDetailHeader = () => (
  <Link to="/books" className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700">
    <ArrowLeft className="h-4 w-4" />
    Back to books
  </Link>
);
