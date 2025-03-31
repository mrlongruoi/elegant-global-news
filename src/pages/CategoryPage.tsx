
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ArticleCard from '@/components/articles/ArticleCard';
import { getArticlesByCategory } from '@/services/articleService';
import { AnimatedContainer } from '@/components/ui/animated-container';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
  
  const articles = getArticlesByCategory(formattedCategory);
  
  if (!category || articles.length === 0) {
    return (
      <Layout>
        <AnimatedContainer type="fade" direction="up" className="container-news py-12">
          <h1 className="news-title mb-6">Category not found</h1>
          <p>Sorry, we couldn't find any articles in this category.</p>
        </AnimatedContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-news py-6">
        <AnimatedContainer type="fade" direction="up" duration={0.6}>
          <h1 className="news-title mb-8 border-b border-news-200 pb-4">{formattedCategory.toUpperCase()}</h1>
        </AnimatedContainer>
        
        {articles.length > 0 && (
          <AnimatedContainer type="fade" direction="up" duration={0.6} delay={0.2} className="mb-12">
            <ArticleCard article={articles[0]} variant="large" />
          </AnimatedContainer>
        )}
        
        <AnimatedContainer 
          type="fade" 
          direction="up" 
          delay={0.4}
          staggerChildren={true}
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {articles.slice(1).map((article) => (
            <ArticleCard key={article.id} article={article} variant="medium" />
          ))}
        </AnimatedContainer>
      </div>
    </Layout>
  );
};

export default CategoryPage;
