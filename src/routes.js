import Tournaments from './screens/Tournaments';
import Matches from './screens/Matches';
import Players from './screens/Players';
import Landing from './screens/Landing';
import Stages from './screens/Stages';
import Teams from './screens/Teams';
import Games from './screens/Games';

export default [
  {
    path: '/',
    screen: Landing
  },
  {
    path: '/games',
    screen: Games
  },
  {
    path: '/tournaments',
    screen: Tournaments
  },
  {
    path: '/stages',
    screen: Stages
  },
  {
    path: '/matches',
    screen: Matches
  },
  {
    path: '/teams',
    screen: Teams
  },
  {
    path: '/players',
    screen: Players
  }
];
