
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ArticleCard, { Article } from '@/components/articles/ArticleCard';
import { fetchArticlesByCategory } from '@/services/articles';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { motion } from 'framer-motion';
import { cardHoverVariants, pageTransitionVariants } from '@/lib/animations';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
  
  useEffect(() => {
    const loadArticles = async () => {
      if (!category) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchArticlesByCategory(formattedCategory);
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadArticles();
  }, [category, formattedCategory]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container-news py-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-news-600"></div>
        </div>
      </Layout>
    );
  }
  
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
      <motion.div
        className="container-news py-6"
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <AnimatedContainer type="fade" direction="up" duration={0.6}>
          <h1 className="news-title mb-8 border-b border-news-200 pb-4">{formattedCategory.toUpperCase()}</h1>
        </AnimatedContainer>
        
        {articles.length > 0 && (
          <AnimatedContainer type="fade" direction="up" duration={0.6} delay={0.2} className="mb-12">
            <motion.div
              variants={cardHoverVariants}
              initial="initial"
              whileHover="hover"
            >
              <ArticleCard article={articles[0]} variant="large" />
            </motion.div>
          </AnimatedContainer>
        )}
        
        <AnimatedContainer 
          type="stagger" 
          staggerChildren={true}
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {articles.slice(1).map((article) => (
            <motion.div
              key={article.id}
              variants={cardHoverVariants}
              initial="initial"
              whileHover="hover"
            >
              <ArticleCard article={article} variant="medium" />
            </motion.div>
          ))}
        </AnimatedContainer>
      </motion.div>
    </Layout>
  );
};

export default CategoryPage;
