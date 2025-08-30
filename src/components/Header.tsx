import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Blog DCamargo</span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Posts
            </Link>
            <Link 
              to="/admin" 
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;