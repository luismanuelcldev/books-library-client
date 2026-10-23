import type { Author } from './author';

export interface Book {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  publishDate: string;
  authors?: Author[];
}
