
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { mockArticles } from '@/services/articleService';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Filter articles based on search query
  const filteredArticles = searchQuery 
    ? mockArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const handleSelect = (articleId: string) => {
    const article = mockArticles.find(a => a.id === articleId);
    if (article) {
      navigate(`/article/${article.slug}`);
      onOpenChange(false);
      setSearchQuery('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-3xl">
        <Command className="rounded-lg border-none">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <CommandInput 
              placeholder="Search articles by title, content, or category..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none"
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSearchQuery('')}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CommandList className="max-h-[400px] overflow-y-auto">
            <CommandEmpty className="py-6 text-center text-sm">
              No articles found for "{searchQuery}"
            </CommandEmpty>
            {filteredArticles.length > 0 && (
              <CommandGroup heading="Articles">
                {filteredArticles.map((article) => (
                  <CommandItem
                    key={article.id}
                    onSelect={() => handleSelect(article.id)}
                    className="flex items-start gap-2 p-3 cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-news-500">{article.category.toUpperCase()}</span>
                      <span className="font-semibold">{article.title}</span>
                      <span className="text-sm text-muted-foreground line-clamp-2">
                        {article.excerpt}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {searchQuery.length > 0 && (
              <div className="py-3 px-4 border-t text-sm text-muted-foreground">
                Press <kbd className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-md text-xs">Enter</kbd> to select, 
                <kbd className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-md text-xs ml-1">Escape</kbd> to close
              </div>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
