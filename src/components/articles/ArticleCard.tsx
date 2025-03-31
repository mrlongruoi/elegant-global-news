
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: Date;
  imageUrl: string;
  slug: string;
}

interface ArticleCardProps {
  article: Article;
  variant?: 'large' | 'medium' | 'small';
  className?: string;
}

const ArticleCard = ({ article, variant = 'medium', className = '' }: ArticleCardProps) => {
  const { title, summary, category, author, publishedAt, imageUrl, slug } = article;
  
  if (variant === 'large') {
    return (
      <div className={`mb-8 ${className}`}>
        <Link to={`/article/${slug}`} className="block hover:opacity-90 transition-opacity">
          <div className="aspect-[16/9] overflow-hidden mb-4 rounded-md">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        <div className="space-y-2">
          <div className="text-sm font-semibold text-news-600 uppercase tracking-wider">{category}</div>
          <Link to={`/article/${slug}`} className="block group">
            <h2 className="news-title text-2xl md:text-3xl group-hover:text-news-600 transition-colors">{title}</h2>
          </Link>
          <p className="text-lg text-news-600 line-clamp-3">{summary}</p>
          <div className="flex items-center text-news-500 text-sm">
            <span>By {author}</span>
            <span className="mx-2">•</span>
            <time dateTime={publishedAt.toISOString()}>{format(publishedAt, 'MMMM d, yyyy')}</time>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'medium') {
    return (
      <div className={`relative grid grid-cols-1 md:grid-cols-12 gap-4 ${className}`}>
        <Link to={`/article/${slug}`} className="md:col-span-5 block hover:opacity-90 transition-opacity">
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        <div className="md:col-span-7 space-y-2">
          <Link to={`/category/${category.toLowerCase()}`}>
            <div className="text-xs font-semibold text-news-600 uppercase tracking-wider mb-1">{category}</div>
          </Link>
          <Link to={`/article/${slug}`} className="block group">
            <h3 className="text-xl font-bold leading-tight group-hover:text-news-600 transition-colors">{title}</h3>
          </Link>
          <p className="text-news-600 text-sm md:text-base line-clamp-2">{summary}</p>
          <div className="flex items-center text-news-500 text-xs">
            <span>By {author}</span>
            <span className="mx-2">•</span>
            <time dateTime={publishedAt.toISOString()}>{format(publishedAt, 'MMM d, yyyy')}</time>
          </div>
        </div>
      </div>
    );
  }
  
  // Small variant
  return (
    <div className={`flex items-start space-x-3 ${className}`}>
      <Link to={`/article/${slug}`} className="flex-shrink-0 block hover:opacity-90 transition-opacity">
        <div className="h-16 w-16 overflow-hidden rounded-md">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/article/${slug}`} className="block group">
          <h3 className="text-base font-bold leading-tight truncate group-hover:text-news-600 transition-colors">{title}</h3>
        </Link>
        <div className="flex items-center text-news-500 text-xs mt-1">
          <time dateTime={publishedAt.toISOString()}>{format(publishedAt, 'MMM d')}</time>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
