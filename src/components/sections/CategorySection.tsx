
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard, { Article } from '../articles/ArticleCard';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  title: string;
  articles: Article[];
  viewAllLink?: string;
  className?: string;
}

const CategorySection = ({ title, articles, viewAllLink, className }: CategorySectionProps) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3); // Only show 2 secondary articles

  return (
    <section className={cn("mb-8", className)}>
      <div className="flex items-center justify-between border-b border-news-200 pb-2 mb-6">
        <h2 className="text-xl font-bold text-news-800 tracking-wider">{title}</h2>
        {viewAllLink && (
          <Link 
            to={viewAllLink} 
            className="flex items-center text-sm font-medium text-news-600 hover:text-news-900 transition-colors"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Featured Article */}
        <div className="mb-4">
          <ArticleCard 
            article={featuredArticle} 
            variant="medium" 
            className="bg-white border-b border-news-100 pb-4"
            hideCategory={true}
          />
        </div>
        
        {/* Secondary Articles */}
        <div className="space-y-5">
          {secondaryArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              variant="small"
              hideCategory={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
