import { useParams } from 'react-router-dom';
import { ErrorBanner } from '../../../shared/components/ErrorBanner';
import { useBookDetail } from '../hooks/useBookDetail';
import { BookDetailContent } from '../components/BookDetailContent';
import { BookDetailHeader } from '../components/BookDetailHeader';

const BookDetailPage = () => {
  const { id } = useParams();
  const bookId = Number(id);
  const { book, loading, error, retry } = useBookDetail(bookId);

  return (
    <div className="space-y-6">
      <BookDetailHeader />
      {error && <ErrorBanner message={error} onRetry={retry} />}
      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading book...</div>
      ) : book ? (
        <BookDetailContent book={book} />
      ) : null}
    </div>
  );
};

export default BookDetailPage;
