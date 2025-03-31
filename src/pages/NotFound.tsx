
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { AnimatedContainer } from '@/components/ui/animated-container';

const NotFound = () => {
  return (
    <Layout>
      <AnimatedContainer type="scale" duration={0.7} className="container-news py-12 text-center">
        <h1 className="news-title mb-6">404 - Page Not Found</h1>
        <p className="text-lg text-news-600 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <AnimatedContainer type="fade" direction="up" delay={0.3}>
          <Link 
            to="/" 
            className="inline-block border border-news-900 px-6 py-3 text-news-900 hover:bg-news-900 hover:text-white transition-colors duration-300 hover:scale-105 transform"
          >
            Return to Home
          </Link>
        </AnimatedContainer>
      </AnimatedContainer>
    </Layout>
  );
};

export default NotFound;
