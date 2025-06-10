import HomePage from '@/components/pages/HomePage';
import NotFoundPage from '@/components/pages/NotFoundPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Tasks',
path: '/',
    icon: 'CheckSquare',
    component: HomePage
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
path: '*',
    component: NotFoundPage
  }
};

export const routeArray = Object.values(routes);