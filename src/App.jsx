import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faBars,
  faCog,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components/macro";
import { get } from "lodash-es";
import { FALLBACK_THEME } from "./config";
import { updateSettings } from "reducers/settings.reducer";
import { updateCurrentTheme, getStateFromIdb } from "./util";
import AppMain from "views/AppMain";
import Settings from "views/Settings";
import Search from "views/Search";
import Toolbar from "components/Toolbar";
import Toaster from "components/Toaster";
import ProgressBar from "components/ProgressBar";

const { REACT_APP_ENV } = process.env;
const isElectron = REACT_APP_ENV === "electron";

const AppContainer = styled.div`
  text-align: left;
  background-color: var(--color-bg);
  min-height: 100vh;
  max-height: 100vh;
  min-width: 360px;
  overflow: hidden;
  color: var(--color-typography);
  user-select: none;
`;

library.add(
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faBars,
  faCog,
  faSearch,
  faTrash
);

const App = ({ dispatch }) => {
  useEffect(() => {
    getStateFromIdb((req, db) => () => {
      const currentTheme = get(req, "result.defaultTheme", FALLBACK_THEME);
      updateCurrentTheme(currentTheme);
      dispatch(
        updateSettings({
          ...req.result,
          currentTheme,
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Main = () => (
    <AppContainer>
      <Toaster />
      <ProgressBar />
      <Toolbar />
      <Switch>
        <Route exact path="/" component={AppMain} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/search" component={Search} />
      </Switch>
    </AppContainer>
  );

  return isElectron ? (
    <HashRouter>
      <Main />
    </HashRouter>
  ) : (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

export default connect(
  (state) => ({}),
  (dispatch) => ({ dispatch })
)(App);
