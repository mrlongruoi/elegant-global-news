
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const sections = [
    { title: 'News', links: ['World', 'Politics', 'Business', 'Tech', 'Culture'] },
    { title: 'Opinion', links: ['Editorials', 'Op-Ed', 'Letters', 'Guest Essays'] },
    { title: 'Features', links: ['Arts', 'Books', 'Food', 'Travel', 'Magazine'] },
    { title: 'More', links: ['About Us', 'Contact Us', 'Subscriptions', 'Advertising', 'Careers'] },
  ];

  return (
    <footer className="bg-news-100 border-t border-news-200 mt-12">
      <div className="container-news py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link to="/" className="text-sm text-news-600 hover:text-news-900">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-news-200 mt-8 pt-8 text-center">
          <div className="font-display font-bold text-2xl mb-4">GLOBAL TIMES</div>
          <p className="text-sm text-news-500 mb-2">
            Breaking news and in-depth reporting from around the world
          </p>
          <p className="text-sm text-news-500">
            © {year} Global Times. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
