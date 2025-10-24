import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto ${
      isDarkMode ? 'text-gray-300' : 'text-gray-600'
    }`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} BookStore Manager. All rights reserved.
            </p>
          </div>
          
          {/* Links */}
          <nav className="flex space-x-6">
            <a href="#" className="text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}