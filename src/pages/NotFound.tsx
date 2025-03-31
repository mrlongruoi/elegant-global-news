
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="container-news py-12 text-center">
        <h1 className="news-title mb-6">404 - Page Not Found</h1>
        <p className="text-lg text-news-600 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link 
          to="/" 
          className="inline-block border border-news-900 px-6 py-3 text-news-900 hover:bg-news-900 hover:text-white transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
