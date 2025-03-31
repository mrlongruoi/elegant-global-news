
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import CategorySection from '@/components/sections/CategorySection';
import { getLatestArticles, getArticlesByCategory, mockArticles } from '@/services/articleService';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { motion } from 'framer-motion';
import { pageTransitionVariants } from '@/lib/animations';

const Index = () => {
  // Get the main article and side articles for the hero section
  const mainArticle = mockArticles[0];
  const sideArticles = mockArticles.slice(1, 3);
  
  // Get articles by category
  const worldNews = getArticlesByCategory('World');
  const politics = getArticlesByCategory('Politics');
  const business = getArticlesByCategory('Business'); 
  const technology = getArticlesByCategory('Tech');
  const opinion = getArticlesByCategory('Opinion');
  const culture = getArticlesByCategory('Culture');

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
        <AnimatedContainer type="fade" direction="up" duration={0.7}>
          <HeroSection mainArticle={mainArticle} sideArticles={sideArticles} />
        </AnimatedContainer>
        
        {/* Main Categories */}
        <AnimatedContainer 
          type="stagger" 
          staggerChildren={true}
          staggerDelay={0.1}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8"
        >
          {[
            { title: "WORLD", articles: worldNews, link: "/world" },
            { title: "POLITICS", articles: politics, link: "/politics" },
            { title: "BUSINESS", articles: business, link: "/business" },
            { title: "TECHNOLOGY", articles: technology, link: "/tech" },
            { title: "OPINION", articles: opinion, link: "/opinion" },
            { title: "CULTURE", articles: culture, link: "/culture" }
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
