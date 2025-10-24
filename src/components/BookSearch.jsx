import { useState } from 'react';
import { searchBooks } from '../lib/publicApi';
import Button from './UI/Button';
import Card from './UI/Card';

export default function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Search Books Online
        </h2>
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </Card>

      {error && (
        <Card className="p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <Card key={book.id} className="p-4 hover:shadow-lg transition-shadow">
            {book.thumbnail && (
              <img 
                src={book.thumbnail} 
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
              {book.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              by {book.author}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs line-clamp-3">
              {book.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}