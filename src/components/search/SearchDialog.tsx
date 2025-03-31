
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { mockArticles } from '@/services/articleService';
import { slideInAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  
  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches).slice(0, 5));
    }
  }, []);

  // Save a search term to recent searches
  const saveSearch = (term: string) => {
    if (!term.trim()) return;
    
    const updatedSearches = [
      term, 
      ...recentSearches.filter(s => s !== term)
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };
  
  // Advanced search filtering with relevance scoring
  const getFilteredArticles = () => {
    if (!searchQuery.trim()) return [];
    
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return mockArticles
      .map(article => {
        // Calculate relevance score based on matches
        let score = 0;
        const title = article.title.toLowerCase();
        const summary = article.summary.toLowerCase();
        const category = article.category.toLowerCase();
        
        // Title matches are weighted more heavily
        searchTerms.forEach(term => {
          if (title.includes(term)) score += 10;
          if (summary.includes(term)) score += 5;
          if (category.includes(term)) score += 3;
        });
        
        // Exact phrase match bonus
        if (title.includes(searchQuery.toLowerCase())) score += 15;
        if (summary.includes(searchQuery.toLowerCase())) score += 8;
        
        return { article, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.article);
  };
  
  const filteredArticles = getFilteredArticles();

  const handleSelect = (articleId: string) => {
    const article = mockArticles.find(a => a.id === articleId);
    if (article) {
      saveSearch(searchQuery);
      navigate(`/article/${article.slug}`);
      onOpenChange(false);
      setSearchQuery('');
    }
  };
  
  const handleSearchTermSelect = (term: string) => {
    setSearchQuery(term);
  };

  // Hide the close button in the CommandInput to avoid duplication
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("p-0 gap-0 max-w-3xl", slideInAnimation({ direction: "up", duration: 0.3 }))} closeButtonClassName="hidden">
        <Command className="rounded-lg border-none">
          <CommandInput 
            placeholder="Search articles by title, content, or category..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none"
            autoFocus
          />
          <CommandList className="max-h-[70vh] overflow-y-auto">
            <CommandEmpty className="py-8 text-center text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">No articles found for "{searchQuery}"</p>
                <p className="text-xs text-muted-foreground">Try adjusting your search terms</p>
              </div>
            </CommandEmpty>
            
            {!searchQuery && recentSearches.length > 0 && (
              <CommandGroup heading="Recent Searches">
                {recentSearches.map((term, index) => (
                  <CommandItem
                    key={`recent-${index}`}
                    onSelect={() => handleSearchTermSelect(term)}
                    className="cursor-pointer flex items-center justify-between hover:bg-accent/50 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <Search className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      <span>{term}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {filteredArticles.length > 0 && (
              <CommandGroup heading="Articles">
                {filteredArticles.map((article, index) => (
                  <CommandItem
                    key={article.id}
                    onSelect={() => handleSelect(article.id)}
                    className={cn(
                      "flex items-start gap-3 p-3 cursor-pointer hover:bg-accent/50 transition-colors duration-200",
                      slideInAnimation({ direction: "up", duration: 0.3, delay: 0.05 * index })
                    )}
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <span className="text-xs font-semibold text-news-500">{article.category.toUpperCase()}</span>
                      <span className="font-semibold">{article.title}</span>
                      <span className="text-sm text-muted-foreground line-clamp-2">
                        {article.summary}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {searchQuery.length > 0 && (
              <div className="py-3 px-4 border-t text-xs text-muted-foreground flex items-center justify-between">
                <div>
                  <span className="opacity-70">Press</span>{' '}
                  <kbd className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-md text-xs">↑</kbd>{' '}
                  <kbd className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-md text-xs">↓</kbd>{' '}
                  <span className="opacity-70">to navigate</span>
                </div>
                <div>
                  <kbd className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-md text-xs">Enter</kbd>{' '}
                  <span className="opacity-70">to select</span>{' '}
                  <kbd className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-md text-xs ml-1">Esc</kbd>{' '}
                  <span className="opacity-70">to close</span>
                </div>
              </div>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
