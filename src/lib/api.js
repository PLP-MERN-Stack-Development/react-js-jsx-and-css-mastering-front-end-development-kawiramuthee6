// Local storage based API - no backend required
const STORAGE_KEY = 'books';

// Helper functions for localStorage
const getBooksFromStorage = () => {
  const books = localStorage.getItem(STORAGE_KEY);
  return books ? JSON.parse(books) : [];
};

const saveBooksToStorage = (books) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

// Mock delay to simulate API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchBooks() {
  await delay(500); // Simulate network delay
  return getBooksFromStorage();
}

export async function createBook(data) {
  await delay(300);
  const books = getBooksFromStorage();
  const newBook = {
    ...data,
    _id: Date.now().toString(), // Generate unique ID
    createdAt: new Date().toISOString()
  };
  books.unshift(newBook); // Add to beginning
  saveBooksToStorage(books);
  return newBook;
}

export async function updateBook(id, data) {
  await delay(300);
  const books = getBooksFromStorage();
  const updatedBooks = books.map(book => 
    book._id === id ? { ...book, ...data, updatedAt: new Date().toISOString() } : book
  );
  saveBooksToStorage(updatedBooks);
  return { ...data, _id: id };
}

export async function deleteBook(id) {
  await delay(300);
  const books = getBooksFromStorage();
  const filteredBooks = books.filter(book => book._id !== id);
  saveBooksToStorage(filteredBooks);
}

// Add some sample data if empty
export function initializeSampleData() {
  const existingBooks = getBooksFromStorage();
  if (existingBooks.length === 0) {
    const sampleBooks = [
      {
        _id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A classic novel of the Jazz Age',
        category: 'Fiction',
        price: 12.99,
        publishedYear: 1925,
        publisher: 'Scribner',
        stockQuantity: 15,
        inStock: true,
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        title: 'To Kill a Mockingbird', 
        author: 'Harper Lee',
        description: 'A story of racial injustice and childhood innocence',
        category: 'Fiction',
        price: 14.99,
        publishedYear: 1960,
        publisher: 'J.B. Lippincott & Co.',
        stockQuantity: 8,
        inStock: true,
        createdAt: new Date().toISOString()
      }
    ];
    saveBooksToStorage(sampleBooks);
  }
}