import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../shared/components/Navbar';
import { PageLoader } from '../shared/components/PageLoader';

const BooksPage = lazy(() => import('../features/books/pages/BooksPage'));
const BookDetailPage = lazy(() => import('../features/books/pages/BookDetailPage'));
const AuthorsPage = lazy(() => import('../features/authors/pages/AuthorsPage'));

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/books" replace />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="*" element={<Navigate to="/books" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
