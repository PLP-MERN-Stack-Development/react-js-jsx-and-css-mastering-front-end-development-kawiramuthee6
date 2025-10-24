const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query, maxResults = 10) => {
  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`
    );
    if (!response.ok) throw new Error('Failed to fetch books');
    const data = await response.json();
    
    return data.items?.map(item => ({
      id: item.id,
      title: item.volumeInfo?.title || 'Unknown Title',
      author: item.volumeInfo?.authors?.[0] || 'Unknown Author',
      description: item.volumeInfo?.description || 'No description available',
      category: item.volumeInfo?.categories?.[0] || 'General',
      publishedYear: item.volumeInfo?.publishedDate?.substring(0, 4) || 'Unknown',
      publisher: item.volumeInfo?.publisher || 'Unknown Publisher',
      thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
      pageCount: item.volumeInfo?.pageCount,
      inStock: true,
      stockQuantity: Math.floor(Math.random() * 20) + 1,
      price: (Math.random() * 30 + 10).toFixed(2)
    })) || [];
  } catch (error) {
    throw new Error('Failed to search books: ' + error.message);
  }
};