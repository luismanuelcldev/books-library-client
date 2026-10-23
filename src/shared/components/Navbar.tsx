import { BookOpen, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? 'bg-red-600 text-white'
      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
  }`;

export const Navbar = () => (
  <header className="bg-slate-900 text-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-red-600 p-2 rounded-lg text-white">
          <BookOpen className="h-6 w-6" />
        </div>
        <span className="font-bold text-xl tracking-wide">BooksLibrary</span>
      </div>
      <nav className="flex space-x-2">
        <NavLink to="/books" className={navLinkClass}>
          <BookOpen className="h-4 w-4" />
          <span>Books</span>
        </NavLink>
        <NavLink to="/authors" className={navLinkClass}>
          <Users className="h-4 w-4" />
          <span>Authors</span>
        </NavLink>
      </nav>
    </div>
  </header>
);
