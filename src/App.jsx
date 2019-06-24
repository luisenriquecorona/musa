import React, { useState, useEffect, useRef } from "react"
import Playlist from "./components/Playlist"
import Toolbar from "./components/Toolbar"
import Toaster from "./components/Toaster"
import Cover from "./components/Cover"
import ProgressBar from "./components/ProgressBar"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faCaretRight,
  faBars,
  faCog,
  faSearch
} from "@fortawesome/free-solid-svg-icons"
import { connect } from "react-redux"
import { addToPlaylist, pasteToPlaylist } from "./reducers/player.reducer"
import { FALLBACK_THEME } from "./config"
import { updateCurrentTheme, doIdbRequest, updateStateInIdb } from "./util"
import { get } from "lodash-es"
import "./App.scss"

library.add(
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faCaretRight,
  faBars,
  faCog,
  faSearch
)

export const Colors = {
  Bg: "#21252b",
  Primary: "#753597",
  Secondary: "#21737e",
  Typography: "#fbfbfb",
  TypographyLight: "#000",
  DrGood: "#90ff00",
  DrMediocre: "#ffe02f",
  DrBad: "#f00",
  PrimaryRgb: [117, 53, 151],
  SliderTrack: "#424a56",
  SliderTrackRgb: [66, 74, 86],
  WhiteRgb: [255, 255, 255]
}

const App = ({ dispatch }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const appCenterRef = useRef(null)
  const appRightRef = useRef(null)

  useEffect(() => {
    doIdbRequest({
      method: "get",
      storeName: "state",
      key: "state",
      onReqSuccess: (req, db) => () => {
        const defaultTheme = get(req, "result.defaultTheme", FALLBACK_THEME)
        updateCurrentTheme(defaultTheme)
        updateStateInIdb(req, db, { currentTheme: defaultTheme })
      }
    })

    document.body.style.setProperty("--color-dr-level", Colors.Typography)
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener("resize", handleResize)

    return () => {
      window.addEventListener("resize", handleResize)
    }
  }, [])

  const onDragOver = event => event.preventDefault()

  const onDrop = event => {
    const item = JSON.parse(event.dataTransfer.getData("text"))
    if (Array.isArray(item)) {
      dispatch(pasteToPlaylist(item))
      return
    }
    dispatch(addToPlaylist(item))
  }

  const renderCenterAndRight = isLarge => {
    const scroll = ref => {
      ref.current &&
        ref.current.scrollTo({
          top: ref.current.scrollTop + 200,
          behavior: "smooth"
        })
    }

    const scrollPlaylist = () => {
      isLarge ? scroll(appRightRef) : scroll(appCenterRef)
    }

    const renderPlaylist = () => <Playlist onScrollPlaylist={scrollPlaylist} />

    return (
      <div className="app-wrapper">
        <div
          className="app-center"
          ref={appCenterRef}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <Cover />
          {!isLarge && renderPlaylist()}
        </div>
        {isLarge && (
          <div
            className="app-right"
            ref={appRightRef}
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            {renderPlaylist()}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="app">
      <Toaster />
      <ProgressBar />
      <Toolbar />
      <div>{renderCenterAndRight(windowWidth > 1279)}</div>
    </div>
  )
}

export default connect(
  state => ({}),
  dispatch => ({ dispatch })
)(App)
