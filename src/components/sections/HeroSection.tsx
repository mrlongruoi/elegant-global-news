
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard, { Article } from '../articles/ArticleCard';
import { ChevronRight } from 'lucide-react';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { motion } from 'framer-motion';
import { buttonHoverVariants, cardHoverVariants } from '@/lib/animations';

interface HeroSectionProps {
  mainArticle: Article;
  sideArticles: Article[];
}

const HeroSection = ({ mainArticle, sideArticles }: HeroSectionProps) => {
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Featured Article */}
        <motion.div 
          variants={cardHoverVariants}
          initial="initial"
          whileHover="hover"
          className="lg:col-span-8"
        >
          <AnimatedContainer 
            type="fade" 
            direction="up" 
            duration={0.6} 
            className="h-full bg-white rounded-lg overflow-hidden shadow-sm transition-shadow duration-300"
          >
            <ArticleCard article={mainArticle} variant="large" />
          </AnimatedContainer>
        </motion.div>
        
        {/* Side Articles */}
        <motion.div
          variants={cardHoverVariants}
          initial="initial"
          whileHover="hover"
          className="lg:col-span-4"
        >
          <AnimatedContainer 
            type="fade" 
            direction="up" 
            duration={0.6} 
            delay={0.2}
            className="h-full bg-white rounded-lg shadow-sm transition-shadow duration-300 p-5"
          >
            <div className="flex items-center justify-between mb-4 border-b border-news-200 pb-2">
              <h3 className="text-lg font-bold text-news-800">Latest News</h3>
              <motion.div
                variants={buttonHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/latest" className="text-sm text-news-600 hover:text-news-800 flex items-center group">
                  View All <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </motion.div>
            </div>
            <AnimatedContainer 
              type="stagger" 
              staggerChildren={true} 
              staggerDelay={0.1} 
              className="space-y-6"
            >
              {sideArticles.map((article) => (
                <motion.div
                  key={article.id}
                  variants={cardHoverVariants}
                  initial="initial" 
                  whileHover="hover"
                >
                  <ArticleCard 
                    article={article} 
                    variant="medium" 
                    hideCategory={true}
                  />
                </motion.div>
              ))}
            </AnimatedContainer>
          </AnimatedContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
