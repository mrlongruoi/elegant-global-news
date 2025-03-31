
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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
      <div className={cn("overflow-hidden", className)}>
        <Link to={`/article/${slug}`} className="block hover:opacity-95 transition-opacity">
          <div className="aspect-[16/9] overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        <div className="p-6 space-y-3">
          <Link to={`/category/${category.toLowerCase()}`} className="inline-block">
            <span className="text-sm font-semibold text-news-600 uppercase tracking-wider">{category}</span>
          </Link>
          <Link to={`/article/${slug}`} className="block group">
            <h2 className="text-2xl md:text-3xl font-bold font-display leading-tight group-hover:text-news-600 transition-colors">{title}</h2>
          </Link>
          <p className="text-news-600 line-clamp-3">{summary}</p>
          <div className="flex items-center text-news-500 text-sm pt-2">
            <span className="font-medium">By {author}</span>
            <span className="mx-2">•</span>
            <time dateTime={publishedAt.toISOString()}>{format(publishedAt, 'MMMM d, yyyy')}</time>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'medium') {
    return (
      <div className={cn("flex flex-col md:flex-row gap-4 group", className)}>
        <Link to={`/article/${slug}`} className="block flex-shrink-0 md:w-1/3 hover:opacity-90 transition-opacity">
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        <div className="flex-1 space-y-2">
          <Link to={`/category/${category.toLowerCase()}`} className="inline-block">
            <span className="text-xs font-semibold text-news-600 uppercase tracking-wider">{category}</span>
          </Link>
          <Link to={`/article/${slug}`} className="block">
            <h3 className="text-lg font-bold leading-tight group-hover:text-news-600 transition-colors line-clamp-2">{title}</h3>
          </Link>
          <div className="flex items-center text-news-500 text-xs">
            <time dateTime={publishedAt.toISOString()}>{format(publishedAt, 'MMM d, yyyy')}</time>
          </div>
        </div>
      </div>
    );
  }
  
  // Small variant
  return (
    <div className={cn("flex gap-3 group", className)}>
      <Link to={`/article/${slug}`} className="flex-shrink-0 block hover:opacity-90 transition-opacity">
        <div className="h-20 w-20 overflow-hidden rounded-md">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/category/${category.toLowerCase()}`} className="inline-block">
          <span className="text-xs font-semibold text-news-600 uppercase tracking-wider">{category}</span>
        </Link>
        <Link to={`/article/${slug}`} className="block">
          <h3 className="text-base font-bold leading-tight group-hover:text-news-600 transition-colors line-clamp-2">{title}</h3>
        </Link>
        <div className="flex items-center text-news-500 text-xs mt-1">
          <time dateTime={publishedAt.toISOString()}>{format(publishedAt, 'MMM d')}</time>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
