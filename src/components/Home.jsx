import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import BookForm from './BookForm';
import { fetchBooks, createBook, updateBook, deleteBook, initializeSampleData } from '../lib/api';
import Button from './UI/Button';
import Card from './UI/Card';
import { useLocation } from 'react-router-dom';

export default function Home() {
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [activeSection, setActiveSection] = useState('welcome'); // 'welcome' or 'books'
    

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                initializeSampleData();
                const data = await fetchBooks();
                setBooks(data);
            } catch (e) {
                setError(e.message);
            } finally { 
                setLoading(false); 
            }
        })();
    }, []);

    async function handleAdd(book) {
        const created = await createBook(book);
        setBooks(prev => [created, ...prev]);
        setShowForm(false);
        setActiveSection('books');
    }

    async function handleEdit(book) {
        const updated = await updateBook(book._id, book);
        setBooks(prev => prev.map(x => x._id === book._id ? { ...x, ...book } : x));
    }

    async function handleDelete(id) {
        await deleteBook(id);
        setBooks(prev => prev.filter(x => x._id !== id));
    }

    // Show welcome section by default
    if (activeSection === 'welcome' && !showForm) {
        return (
            <div className="space-y-8">
                {/* Hero Section */}
                <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
                    <h1 className="text-5xl font-bold mb-6">Welcome to BookStore Manager</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Your complete solution for managing your book collection. 
                        Add, organize, and track all your books in one beautiful interface.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button 
                            size="lg" 
                            onClick={() => setActiveSection('books')}
                            className="border-white text-white hover:bg-white hover:text-blue-600"
                        >
                            View My Books
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline"
                            onClick={() => setShowForm(true)}
                            className="border-white text-white hover:bg-white hover:text-blue-600"
                        >
                            Add New Book
                        </Button>
                    </div>
                </section>

                {/* Features Grid */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                        Why Choose BookStore Manager?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '📚',
                                title: 'Easy Book Management',
                                description: 'Add, edit, and organize your entire book collection with our intuitive interface.'
                            },
                            {
                                icon: '🔍',
                                title: 'Quick Search & Filter',
                                description: 'Find any book instantly with powerful search and filtering capabilities.'
                            },
                            {
                                icon: '💾',
                                title: 'Local Storage',
                                description: 'Your data stays secure in your browser with automatic local storage.'
                            },
                            {
                                icon: '🎨',
                                title: 'Beautiful Design',
                                description: 'Clean, modern interface that works perfectly on all your devices.'
                            },
                            {
                                icon: '🌙',
                                title: 'Dark Mode',
                                description: 'Comfortable reading experience with built-in dark mode support.'
                            },
                            {
                                icon: '⚡',
                                title: 'Fast & Responsive',
                                description: 'Lightning-fast performance that never keeps you waiting.'
                            }
                        ].map((feature, index) => (
                            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Quick Stats */}
                <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { number: books.length, label: 'Books in Collection' },
                            { number: books.filter(b => b.inStock).length, label: 'Books in Stock' },
                            { number: books.length > 0 ? Math.max(...books.map(b => b.publishedYear)) : 0, label: 'Latest Publication' },
                            { number: '100%', label: 'Satisfaction' }
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center">
                    <Card className="p-8">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                            Ready to Get Started?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                            Join thousands of book lovers who use BookStore Manager to organize their collections. 
                            It's free, easy to use, and works perfectly on all your devices.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button 
                                size="lg"
                                onClick={() => setActiveSection('books')}
                            >
                                Explore My Books
                            </Button>
                            <Button 
                                size="lg"
                                variant="outline"
                                onClick={() => setShowForm(true)}
                            >
                                Add Your First Book
                            </Button>
                        </div>
                    </Card>
                </section>
            </div>
        );
    }

    // Show book management section
    return (
        <div className="space-y-6">
            {/* Header for Books Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        My Book Collection
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage and organize all your books in one place
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button 
                        variant="outline"
                        onClick={() => setActiveSection('welcome')}
                    >
                        ← Back to Home
                    </Button>
                    <Button 
                        onClick={() => setShowForm(true)}
                    >
                        Add New Book
                    </Button>
                </div>
            </div>

            {/* Book Form */}
            {showForm && (
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Add New Book
                        </h2>
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                    <BookForm onSubmit={handleAdd} />
                </Card>
            )}

            {/* Books List */}
            {loading && <p className="text-center py-4">Loading books...</p>}
            {error && <p className="text-red-600 text-center py-4">{error}</p>}
            
            {books.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map(book => (
                        <BookCard 
                            key={book._id} 
                            book={book} 
                            onEdit={handleEdit} 
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <Card className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h2 className="text-2xl font-bold text-gray-600 mb-4">
                        No Books Yet
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Start by adding your first book to the collection!
                    </p>
                    <Button onClick={() => setShowForm(true)}>
                        Add Your First Book
                    </Button>
                </Card>
            )}
        </div>
    );
}