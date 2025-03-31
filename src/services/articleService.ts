
import { Article } from '@/components/articles/ArticleCard';

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const last30Days = new Date();
last30Days.setDate(last30Days.getDate() - 30);

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Global Climate Summit Ends With Historic Agreement on Emissions',
    summary: 'World leaders reached a landmark deal to reduce carbon emissions by 50% before 2030, marking a significant step forward in the fight against climate change.',
    category: 'World',
    author: 'Emma Johnson',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'global-climate-summit-historic-agreement',
  },
  {
    id: '2',
    title: 'Tech Giants Face New Regulations in European Union',
    summary: 'The European Commission unveiled sweeping new rules aimed at curbing the market power of large technology companies, potentially reshaping how they operate in the region.',
    category: 'Tech',
    author: 'Michael Chen',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'tech-giants-new-eu-regulations',
  },
  {
    id: '3',
    title: 'Major Breakthrough in Renewable Energy Storage',
    summary: 'Scientists have developed a new battery technology that can store renewable energy for months, potentially solving one of the biggest challenges in the transition to clean energy.',
    category: 'Science',
    author: 'Sarah Williams',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'renewable-energy-storage-breakthrough',
  },
  {
    id: '4',
    title: 'Global Markets Rally as Inflation Fears Ease',
    summary: 'Stock markets worldwide surged after new economic data suggested inflation pressures may be moderating, easing concerns about aggressive interest rate hikes.',
    category: 'Business',
    author: 'Robert Anderson',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'global-markets-rally-inflation-easing',
  },
  {
    id: '5',
    title: 'Cultural Landmarks Face New Threats From Climate Change',
    summary: 'UNESCO warns that hundreds of world heritage sites are at risk from rising sea levels, extreme weather, and other climate change impacts.',
    category: 'Culture',
    author: 'Elena Martinez',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'cultural-landmarks-climate-change-threats',
  },
  {
    id: '6',
    title: 'Democracy Under Pressure: Global Freedom Index Declines',
    summary: 'A new report shows democratic institutions weakening in several regions, with press freedom and civil liberties facing particular challenges.',
    category: 'Politics',
    author: 'James Wilson',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'democracy-pressure-freedom-index-declines',
  },
  {
    id: '7',
    title: 'Artificial Intelligence Transforms Healthcare Diagnoses',
    summary: 'New AI systems are outperforming doctors in detecting certain diseases from medical imaging, promising faster and more accurate diagnoses.',
    category: 'Tech',
    author: 'David Kim',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'ai-transforms-healthcare-diagnoses',
  },
  {
    id: '8',
    title: 'Supply Chain Crisis Eases as Global Shipping Returns to Normal',
    summary: 'After two years of disruptions, international shipping routes and prices are stabilizing, bringing relief to manufacturers and retailers worldwide.',
    category: 'Business',
    author: 'Sophia Garcia',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'supply-chain-crisis-eases-shipping',
  },
  {
    id: '9',
    title: 'Novel Wins Prestigious Literary Prize, Sparking Cultural Debate',
    summary: 'The unconventional winner of this year's top literary award has ignited conversations about changing standards in literature and representation in publishing.',
    category: 'Culture',
    author: 'Thomas Moore',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'novel-literary-prize-cultural-debate',
  },
  {
    id: '10',
    title: 'Diplomatic Breakthrough in Long-standing Regional Conflict',
    summary: 'After decades of tension, neighboring countries have signed a peace agreement, opening borders and establishing new economic partnerships.',
    category: 'World',
    author: 'Olivia Washington',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1626212640788-44a3d433715a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'diplomatic-breakthrough-regional-conflict',
  },
  {
    id: '11',
    title: 'Space Tourism Takes Flight as Commercial Launches Increase',
    summary: 'Private companies are making space travel a reality for civilians, with multiple successful tourist missions completed this year.',
    category: 'Science',
    author: 'Nathan Lee',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1501862700950-18382cd41497?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'space-tourism-commercial-launches',
  },
  {
    id: '12',
    title: 'Analysis: The Economic Impact of Aging Populations',
    summary: 'As many countries face demographic shifts, economists examine the long-term implications for labor markets, healthcare systems, and retirement policies.',
    category: 'Opinion',
    author: 'Victoria Robinson',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'economic-impact-aging-populations',
  },
  {
    id: '13',
    title: 'Historic Election Reshapes Political Landscape',
    summary: 'Voters have delivered a surprise result that will transform the country's governance, with implications for international alliances and domestic policy.',
    category: 'Politics',
    author: 'Alexander Hughes',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'historic-election-political-landscape',
  },
  {
    id: '14',
    title: 'New Digital Privacy Laws Transform Online Business Models',
    summary: 'Comprehensive regulations are forcing companies to rethink how they collect and use consumer data, with major implications for digital advertising.',
    category: 'Tech',
    author: 'Rebecca Torres',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1605405749986-183d382beb5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'digital-privacy-laws-business-models',
  },
  {
    id: '15',
    title: 'Traditional Crafts Find New Markets Through E-Commerce',
    summary: 'Artisans from remote regions are connecting with global consumers, preserving cultural heritage while building sustainable businesses.',
    category: 'Culture',
    author: 'John Davis',
    publishedAt: generateRandomDate(last30Days, new Date()),
    imageUrl: 'https://images.unsplash.com/photo-1505236904719-4fc588a3e4da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'traditional-crafts-ecommerce-markets',
  },
];

export const getArticlesByCategory = (category: string): Article[] => {
  return mockArticles.filter(article => article.category.toLowerCase() === category.toLowerCase());
};

export const getLatestArticles = (count: number = 5): Article[] => {
  return [...mockArticles]
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, count);
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return mockArticles.find(article => article.slug === slug);
};

export const getFeaturedArticles = (): Article[] => {
  return mockArticles.slice(0, 5);
};
