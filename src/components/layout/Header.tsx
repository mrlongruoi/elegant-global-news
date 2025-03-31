
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import SearchDialog from '@/components/search/SearchDialog';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'World', href: '/world' },
    { name: 'Politics', href: '/politics' },
    { name: 'Business', href: '/business' },
    { name: 'Culture', href: '/culture' },
    { name: 'Tech', href: '/tech' },
    { name: 'Opinion', href: '/opinion' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="border-b border-news-200">
      <div className="container-news py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="mr-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search size={20} />
            </Button>
          </div>
          
          <div className="flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link to="/" className="font-display text-center font-bold text-2xl md:text-3xl tracking-tight">
              GLOBAL TIMES
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="transition-all hover:bg-news-100">
              <Search size={20} />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm py-2">
          <div className="hidden md:block text-news-500">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </div>
          <div className="md:hidden text-news-500 text-xs">
            {format(new Date(), 'MMM d, yyyy')}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <nav className="container-news py-4 space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-2 py-2 text-lg border-b border-news-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Desktop navigation */}
      <nav className="hidden md:block border-t border-b border-news-200">
        <div className="container-news">
          <div className="flex justify-between space-x-6 overflow-x-auto py-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="whitespace-nowrap text-news-700 hover:text-news-900 px-1 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
};

export default Header;
