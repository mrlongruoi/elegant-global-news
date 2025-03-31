
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import AdminArticleList from '@/components/admin/AdminArticleList';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const AdminPage = () => {
  const { logout, user } = useAuth();

  // When the component mounts, check the current session to verify authentication
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error checking session:', error);
      } else {
        console.log('Current session:', data.session?.user?.email);
      }
    };
    
    checkSession();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Layout>
      <div className="container-news py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="news-title">Admin Dashboard</h1>
            {user && (
              <p className="text-sm text-muted-foreground">
                Logged in as {user.email}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/admin/create">Create New Article</Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        
        <AdminArticleList />
      </div>
    </Layout>
  );
};

export default AdminPage;
