
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const ServicesPage = lazy(() => import('../pages/services/page'));
const BusinessPlanPage = lazy(() => import('../pages/services/business-plan/page'));
const MarketResearchPage = lazy(() => import('../pages/services/market-research/page'));
const EnquetesMarketingPage = lazy(() => import('../pages/services/enquetes-marketing/page'));
const WhyChooseUsPage = lazy(() => import('../pages/pourquoi-nous-choisir/page'));
const CaseStudiesPage = lazy(() => import('../pages/etudes-realisees/page'));
const BlogPage = lazy(() => import('../pages/blog/page'));
const AdminLoginPage = lazy(() => import('../pages/admin/login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboard/page'));
const AdminCMSPage = lazy(() => import('../pages/admin/cms/page'));
const MentionsLegalesPage = lazy(() => import('../pages/mentions-legales/page'));
const PolitiqueConfidentialitePage = lazy(() => import('../pages/politique-confidentialite/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
import DemandeDevisPage from '../pages/demande-devis/page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/a-propos',
    element: <AboutPage />,
  },
  {
    path: '/nos-services',
    element: <ServicesPage />,
  },
  {
    path: '/services/business-plan',
    element: <BusinessPlanPage />,
  },
  {
    path: '/services/etudes-de-marche',
    element: <MarketResearchPage />,
  },
  {
    path: '/services/enquetes-marketing',
    element: <EnquetesMarketingPage />,
  },
  {
    path: '/pourquoi-nous-choisir',
    element: <WhyChooseUsPage />,
  },
  {
    path: '/etudes-realisees',
    element: <CaseStudiesPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboardPage />,
  },
  {
    path: '/admin/cms',
    element: <AdminCMSPage />,
  },
  {
    path: '/mentions-legales',
    element: <MentionsLegalesPage />,
  },
  {
    path: '/politique-confidentialite',
    element: <PolitiqueConfidentialitePage />,
  },
  {
    path: '/demande-devis',
    element: <DemandeDevisPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
