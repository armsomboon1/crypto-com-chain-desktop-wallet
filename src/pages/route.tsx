import React from 'react';
import {
  BrowserRouter,
  HashRouter as ElectronRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { isElectron } from '../utils/utils';

import WelcomePage from './welcome/welcome';
import RestorePage from './restore/restore';
import CreatePage from './create/create';
import BackupPage from './backup/backup';
import HomePage from './home/home';
import WalletPage from './wallet/wallet';
import StakingPage from './staking/staking';
import GovernancePage from './governance/governance';
import NftPage from './nft/nft';
import SettingsPage from './settings/settings';
import SignUpPage from './signup/signup';
import HomeLayout from '../layouts/home/home';
import AssetsPage from './assets/assets';

interface RouterProps {
  children: React.ReactNode;
}

// Electron build: <HashRouter>, Web build: <BrowserRouter>
const Router: React.FC<RouterProps> = props => {
  return isElectron() ? (
    <ElectronRouter>{props.children}</ElectronRouter>
  ) : (
    <BrowserRouter>{props.children}</BrowserRouter>
  );
};

function RouteHub() {
  const routeIndex = {
    name: 'Welcome Page',
    key: 'welcome',
    path: '/',
    component: <WelcomePage />,
  };

  const routeItems = [
    {
      name: 'Welcome Page',
      key: 'welcome',
      path: '/welcome',
      component: <WelcomePage />,
    },
    {
      name: 'Restore Page',
      key: 'restore',
      path: '/restore',
      component: <RestorePage />,
    },
    {
      name: 'Create Page',
      key: 'create',
      path: '/create',
      component: <CreatePage />,
    },
    {
      name: 'Backup Page',
      key: 'backup',
      path: '/create/backup',
      component: <BackupPage />,
    },
    {
      name: 'SignUp Page',
      key: 'signUp',
      path: '/signUp',
      component: <SignUpPage />,
    },
  ];

  const routeHomeLayoutItems = [
    {
      name: 'Home Page',
      key: 'home',
      path: '/home',
      component: <HomePage />,
    },
    {
      name: 'Send Page',
      key: 'send',
      path: '/send',
      component: <AssetsPage />,
    },
    {
      name: 'Assets Page',
      key: 'assets',
      path: '/assets',
      component: <AssetsPage />,
    },
    {
      name: 'Staking Page',
      key: 'staking',
      path: '/staking',
      component: <StakingPage />,
    },
    {
      name: 'Governance Page',
      key: 'governance',
      path: '/governance',
      component: <GovernancePage />,
    },
    {
      name: 'Nft Page',
      key: 'nft',
      path: '/nft',
      component: <NftPage />,
    },
    {
      name: 'Settings Page',
      key: 'settings',
      path: '/settings',
      component: <SettingsPage />,
    },
    {
      name: 'Wallet Page',
      key: 'wallet',
      path: '/wallet',
      component: <WalletPage />,
    },
  ];

  return (
    <Router>
      <Switch>
        <Route exact path={routeIndex.path} key={routeIndex.key}>
          {routeIndex.component}
        </Route>
        {routeItems.map(item => {
          return (
            <Route exact path={item.path} key={item.path}>
              {item.component}
            </Route>
          );
        })}
        <HomeLayout>
          <Switch>
            {routeHomeLayoutItems.map(item => {
              return (
                <Route exact path={item.path} key={item.path}>
                  {item.component}
                </Route>
              );
            })}
            <Route>
              <Redirect to="/home" />
            </Route>
          </Switch>
        </HomeLayout>
      </Switch>
    </Router>
  );
}

export default RouteHub;
