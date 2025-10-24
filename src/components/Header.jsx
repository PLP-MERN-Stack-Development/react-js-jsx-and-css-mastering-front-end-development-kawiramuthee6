import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Button from './UI/Button';

export default function Header() {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Search Books' },
    { path: '/tasks', label: 'Task Manager' }
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-3xl">📚</span>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                BookStore
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                BOOK MANAGEMENT
              </p>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center space-x-2"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}