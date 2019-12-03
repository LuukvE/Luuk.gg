import Tournaments from './screens/Tournaments';
import Dashboard from './screens/Dashboard';
import Matches from './screens/Matches';
import Stages from './screens/Stages';
import Teams from './screens/Teams';
import Games from './screens/Games';

export default [
  {
    path: '/',
    screen: Dashboard,
  },
  {
    path: '/games',
    screen: Games,
  },
  {
    path: '/tournaments',
    screen: Tournaments,
  },
  {
    path: '/stages',
    screen: Stages,
  },
  {
    path: '/matches',
    screen: Matches,
  },
  {
    path: '/teams',
    screen: Teams,
  },
];
