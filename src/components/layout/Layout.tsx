
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedContainer } from '@/components/ui/animated-container';
import { motion } from 'framer-motion';
import { pageTransitionVariants } from '@/lib/animations';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.div
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-grow pt-16" {/* Add padding-top to account for fixed header */}
      >
        <AnimatedContainer type="fade" direction="up" duration={0.6} className="flex-grow">
          <main className="flex-grow">
            {children}
          </main>
        </AnimatedContainer>
      </motion.div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
