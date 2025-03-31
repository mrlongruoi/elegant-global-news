
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import SearchDialog from '@/components/search/SearchDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const categories = [
  { name: 'World', href: '/world' },
  { name: 'Politics', href: '/politics' },
  { name: 'Business', href: '/business' },
  { name: 'Tech', href: '/tech' },
  { name: 'Science', href: '/science' },
  { name: 'Culture', href: '/culture' },
  { name: 'Opinion', href: '/opinion' },
];

export default function Header() {
  const mobile = useIsMobile();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b fixed top-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20">
      <div className="container-news flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          {mobile ? (
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="w-3/4 h-full rounded-none pt-16">
                <div className="flex flex-col space-y-3 p-4">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      to={category.href}
                      className={cn(
                        "text-lg font-medium transition-colors",
                        location.pathname === category.href
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    to="/admin"
                    className="text-lg font-medium transition-colors text-muted-foreground hover:text-foreground mt-4 pt-4 border-t"
                  >
                    Admin
                  </Link>
                </div>
              </DrawerContent>
            </Drawer>
          ) : null}
          <Link to="/" className="font-display text-xl md:text-2xl font-bold">
            NewsDaily
          </Link>
        </div>
        {!mobile ? (
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            {categories.map((category) => (
              <Link
                key={category.href}
                to={category.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === category.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
            >
              Admin
            </Link>
          </nav>
        ) : null}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 rounded-full bg-background hover:bg-accent"
            onClick={() => setSearchOpen(true)}
            aria-label="Search articles"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search articles</span>
          </Button>
          
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-gray-100"
            >
              <Link to="/admin">
                <User className="h-5 w-5" />
                <span className="sr-only">Admin Dashboard</span>
              </Link>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-sm"
            >
              <Link to="/admin/login">
                Admin Login
              </Link>
            </Button>
          )}
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
