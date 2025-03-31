
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedContainer } from '@/components/ui/animated-container';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AnimatedContainer type="fade" direction="up" duration={0.5} className="flex-grow">
        <main className="flex-grow">
          {children}
        </main>
      </AnimatedContainer>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
