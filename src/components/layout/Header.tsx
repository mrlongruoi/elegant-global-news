
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import SearchDialog from '@/components/search/SearchDialog';
import { useIsMobile } from '@/hooks/use-mobile';

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
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
