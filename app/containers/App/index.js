/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import DashboardDesktopPage from 'containers/DashboardDesktopPage';
import DashboardExplainPage from 'containers/DashboardExplainPage';
import DashboardPage from 'containers/DashboardPage';
import MasternodeExplainPage from 'containers/MasternodeExplainPage';
import ReportExplainPage from 'containers/ReportExplainPage';

import Header from 'components/Header'

export default function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route path="/dashboard-desktop" component={DashboardDesktopPage} />
        <Route path="/dashboard-explain" component={DashboardExplainPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/masternode-explain" component={MasternodeExplainPage} />
        <Route path="/report-explain" component={ReportExplainPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
