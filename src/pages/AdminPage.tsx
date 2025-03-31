
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import AdminArticleList from '@/components/admin/AdminArticleList';

const AdminPage = () => {
  return (
    <Layout>
      <div className="container-news py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="news-title">Admin Dashboard</h1>
          <Button asChild>
            <Link to="/admin/create">Create New Article</Link>
          </Button>
        </div>
        
        <AdminArticleList />
      </div>
    </Layout>
  );
};

export default AdminPage;
