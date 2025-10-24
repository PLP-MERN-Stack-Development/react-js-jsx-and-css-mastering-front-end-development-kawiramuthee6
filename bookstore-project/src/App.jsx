import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import BookSearch from './components/BookSearch';
import TaskManager from './components/TaskManager';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
          <Header />
          <main className="container mx-auto px-4 py-8 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Home />} />
              <Route path="/search" element={<BookSearch />} />
              <Route path="/tasks" element={<TaskManager />} />
            </Routes>
          </main>
          <Footer /> {/* Footer added here */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;