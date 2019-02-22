import React, { Component } from "react";
import Library from "./library/Library";
import Player from "./player/Player";
import Playlist from "./playlist/Playlist";
import Toolbar from "./toolbar/Toolbar";
// import LeftMenu from "./left-menu/LeftMenu";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faCaretRight,
  faBars,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";

library.add(
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faCaretRight,
  faBars,
  faCog
);

class App extends Component {
  render() {
    return (
      <div className="app">
        <Toolbar />
        <div className="app-wrapper">
          <div className="app-left">
            <Library />
          </div>
          <div className="app-center">
            <Player />
          </div>
          <div className="app-right">
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
