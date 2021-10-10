import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { useKeyPress } from "../hooks";
import { KEYS, isCtrlDown } from "../util";
import Library from "components/LibraryV2";

const { REACT_APP_ENV } = process.env;
const isElectron = REACT_APP_ENV === "electron";

let ipc;
if (isElectron && window.require) {
  ipc = window.require("electron").ipcRenderer;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: var(--titlebar-height);
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--color-bg);
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 16px;
  -webkit-app-region: drag;
`;

const ButtonContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
`;

const buttonCss = css`
  width: 48px;
  height: 36px;
  outline: none;
  -webkit-app-region: no-drag;
  display: inline-block;
  cursor: pointer;
  position: relative;
`;

const MinButton = styled.div`
  ${buttonCss}

  :hover {
    background: #9b9b9b;

    > div {
      background: #fff;
    }
  }

  > div {
    height: 1px;
    width: 12px;
    background: var(--color-typography);
    position: absolute;
    top: 46%;
    left: 18px;
  }
`;

const MaxButton = styled.div`
  ${buttonCss}

  :hover {
    background: #9b9b9b;

    > div {
      border-color: #fff;
    }
  }

  > div {
    border-width: 1px;
    border-color: var(--color-typography);
    border-style: solid;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 30%;
    left: 18px;
  }
`;

const CloseButton = styled.div`
  ${buttonCss}

  :hover {
    background: #f11818;

    > div {
      background: #fff;
    }
  }

  > div {
    height: 1px;
    width: 15px;
    background: var(--color-typography);
    position: absolute;
    top: 46%;
    left: 17px;
  }

  > div:first-of-type {
    transform: rotate(45deg);
  }

  > div:last-of-type {
    transform: rotate(-45deg);
  }
`;

const buttonCss2 = css`
  font-size: 1.2rem;
  outline: none;
  -webkit-app-region: no-drag;
  width: 48px;
  height: 36px;

  :hover {
    color: #fff;
    background: #9b9b9b;

    > div {
      border-color: #fff;
    }
  }
`;

const LibraryButton = styled.button`
  ${buttonCss2}
`;

const SearchButton = styled.button`
  ${buttonCss2}
`;

const SettingsButton = styled.button`
  ${buttonCss2}
`;

const Titlebar = ({ location, history }) => {
  const [isLibraryVisible, setIsLibraryVisible] = useState(
    location.pathname === "/"
  );

  const libraryRef = useRef();
  const libraryButtonRef = useRef();
  const settingsButtonRef = useRef();
  const searchButtonRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (
        libraryButtonRef.current &&
        libraryButtonRef.current.contains(e.target)
      ) {
        return;
      }

      if (libraryRef.current && libraryRef.current.contains(e.target)) {
        return;
      }

      setIsLibraryVisible(false);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const goToSearchByKeyEvent = (event) => {
    if (!isCtrlDown(event)) {
      return;
    }

    if (location.pathname === "/search") {
      history.push("/");
      return;
    }

    history.push("/search");
    setIsLibraryVisible(false);
  };
  useKeyPress(KEYS.F, goToSearchByKeyEvent);

  const toggleLibrary = (event) => {
    libraryButtonRef.current.blur();

    if (location.pathname !== "/") {
      history.push("/");
      setIsLibraryVisible(true);
      return;
    }

    setIsLibraryVisible(!isLibraryVisible);
    event.stopPropagation();
  };

  const toggleSettings = (event) => {
    settingsButtonRef.current.blur();

    if (location.pathname === "/settings") {
      history.push("/");
    } else {
      history.push("/settings");
    }

    event.stopPropagation();
  };

  const toggleSearch = (event) => {
    searchButtonRef.current.blur();

    if (location.pathname === "/search") {
      history.push("/");
    } else {
      history.push("/search");
    }

    event.stopPropagation();
  };

  const minimize = () => {
    ipc.send("musa:window:minimize");
  };

  const maximize = () => {
    ipc.send("musa:window:maximize");
  };

  const unmaximize = () => {
    ipc.send("musa:window:unmaximize");
  };

  const maxOrUnMax = () => {
    ipc.once("musa:window:isMaximized:response", (event, isMaximized) => {
      if (isMaximized) {
        unmaximize();
      } else {
        maximize();
      }
    });
    ipc.send("musa:window:isMaximized:request");
  };

  const close = () => {
    ipc.send("musa:window:close");
  };

  return (
    <>
      <Library ref={libraryRef} isVisible={isLibraryVisible} />
      <Container>
        <div>
          <LibraryButton onClick={toggleLibrary} ref={libraryButtonRef}>
            <FontAwesomeIcon icon="bars" />
          </LibraryButton>

          <SearchButton onClick={toggleSearch} ref={searchButtonRef}>
            <FontAwesomeIcon icon="search" />
          </SearchButton>

          <SettingsButton onClick={toggleSettings} ref={settingsButtonRef}>
            <FontAwesomeIcon icon="cog" />
          </SettingsButton>
        </div>
        {ipc && (
          <ButtonContainer>
            <MinButton onClick={minimize}>
              <div />
            </MinButton>
            <MaxButton onClick={maxOrUnMax}>
              <div />
            </MaxButton>
            <CloseButton onClick={close}>
              <div />
              <div />
            </CloseButton>
          </ButtonContainer>
        )}
      </Container>
    </>
  );
};

export default withRouter(Titlebar);
