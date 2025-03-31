
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import CategorySection from '@/components/sections/CategorySection';
import { fetchLatestArticles, fetchArticlesByCategory } from '@/services/supabaseArticleService';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { motion } from 'framer-motion';
import { pageTransitionVariants } from '@/lib/animations';
import { Article } from '@/components/articles/ArticleCard';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categorizedArticles, setCategorizedArticles] = useState<Record<string, Article[]>>({});
  
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get latest articles for hero section
        const latestArticles = await fetchLatestArticles(10);
        setArticles(latestArticles);
        
        // Get articles by categories
        const categories = ['World', 'Politics', 'Business', 'Tech', 'Opinion', 'Culture'];
        const categoryPromises = categories.map(async (category) => {
          try {
            const articles = await fetchArticlesByCategory(category);
            return { category, articles };
          } catch (err) {
            console.error(`Error fetching ${category} articles:`, err);
            return { category, articles: [] };
          }
        });
        
        const results = await Promise.all(categoryPromises);
        const categorizedData: Record<string, Article[]> = {};
        
        results.forEach(({ category, articles }) => {
          categorizedData[category.toLowerCase()] = articles;
        });
        
        setCategorizedArticles(categorizedData);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadArticles();
  }, []);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container-news py-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-news-600"></div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="container-news py-12">
          <h1 className="news-title mb-6">Error</h1>
          <p>{error}</p>
        </div>
      </Layout>
    );
  }
  
  // Get the main article and side articles for the hero section
  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  return (
    <Layout>
      <motion.div 
        className="container-news bg-gray-50"
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Hero Section */}
        {mainArticle && (
          <AnimatedContainer type="fade" direction="up" duration={0.7}>
            <HeroSection mainArticle={mainArticle} sideArticles={sideArticles} />
          </AnimatedContainer>
        )}
        
        {/* Main Categories */}
        <AnimatedContainer 
          type="stagger" 
          staggerChildren={true}
          staggerDelay={0.1}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8"
        >
          {[
            { title: "WORLD", articles: categorizedArticles['world'] || [], link: "/world" },
            { title: "POLITICS", articles: categorizedArticles['politics'] || [], link: "/politics" },
            { title: "BUSINESS", articles: categorizedArticles['business'] || [], link: "/business" },
            { title: "TECHNOLOGY", articles: categorizedArticles['tech'] || [], link: "/tech" },
            { title: "OPINION", articles: categorizedArticles['opinion'] || [], link: "/opinion" },
            { title: "CULTURE", articles: categorizedArticles['culture'] || [], link: "/culture" }
          ].map((category, index) => (
            <motion.div 
              key={category.title}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <CategorySection 
                title={category.title} 
                articles={category.articles} 
                viewAllLink={category.link} 
              />
            </motion.div>
          ))}
        </AnimatedContainer>
      </motion.div>
    </Layout>
  );
};

export default Index;
