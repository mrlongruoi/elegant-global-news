
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard, { Article } from '../articles/ArticleCard';
import { ChevronRight } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  articles: Article[];
  viewAllLink?: string;
}

const CategorySection = ({ title, articles, viewAllLink }: CategorySectionProps) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);

  return (
    <section className="category-section">
      <div className="flex items-center justify-between mb-4 border-b border-news-200 pb-2">
        <h2 className="text-lg font-bold text-news-800 tracking-wider">{title}</h2>
        {viewAllLink && (
          <Link 
            to={viewAllLink} 
            className="flex items-center text-sm font-medium text-news-600 hover:text-news-900 transition-colors"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Article */}
        <div className="lg:col-span-2">
          <ArticleCard 
            article={featuredArticle} 
            variant="medium" 
            className="h-full"
          />
        </div>
        
        {/* Secondary Articles */}
        <div className="space-y-4 lg:col-span-1">
          {secondaryArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              variant="small" 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
