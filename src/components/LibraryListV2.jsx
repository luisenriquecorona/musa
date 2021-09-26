import React, { useState } from "react";
import styled from "styled-components/macro";
import LibraryItem from "./LibraryItem";
import AlbumCover from "./common/AlbumCoverV2";

const { REACT_APP_ENV } = process.env;
const isElectron = REACT_APP_ENV === "electron";

let ipc;
if (isElectron && window.require) {
  ipc = window.require("electron").ipcRenderer;
}

const LibraryListContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-align: left;
  padding-left: ${({ isRoot }) => (isRoot ? 0 : 12)}px;
  padding-right: 12px;

  > li:nth-child(2) {
    padding-top: 4px;
  }

  > li:last-child:not(:first-child) {
    margin-bottom: 20px;
  }

  > li:hover {
    background-color: var(--color-secondary-highlight);
    color: var(--color-typography-secondary);
  }
`;

const LibraryListFolder = styled.li`
  cursor: pointer;
  padding: 2px 12px;
  letter-spacing: 0.666px;

  > div {
    max-width: 100%;
    border: 0;
    margin: 5px 0;
  }
`;

const LibraryList = ({ item, cover, isArtist, isAlbum }) => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [files, setFiles] = useState([]);
  const [showAlbums, setShowAlbums] = useState(false);
  const [showSongs, setShowSongs] = useState(false);

  const toggleAlbum = () => {
    if (albums.length < 1 && !showAlbums) {
      if (ipc) {
        ipc.once("musa:artist:response", (event, data) => {
          setAlbums(data.albums);
          setFiles(data.files);
        });
        ipc.send("musa:artist:request", item.id);
      } else {
        fetch(item.url)
          .then((response) => response.json())
          .then((data) => {
            setAlbums(data.albums);
          });
      }
    }
    setShowAlbums(!showAlbums);
  };

  const toggleSongs = () => {
    if (songs.length < 1 && !showSongs) {
      if (ipc) {
        ipc.once("musa:album:response", (event, data) => {
          setSongs(data.files);
        });
        ipc.send("musa:album:request", item.id);
      } else {
        fetch(item.url)
          .then((response) => response.json())
          .then((data) => {
            setSongs(data.files);
          });
      }
    }
    setShowSongs(!showSongs);
  };

  const onDragStart = (event) => {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ isArtist, isAlbum, item })
    );

    event.stopPropagation();
  };

  const renderFolderName = () =>
    isAlbum ? <AlbumCover item={item} /> : <>{item.name || "Unknown title"}</>;

  const renderArtistsAndAlbums = () => (
    <LibraryListContainer isRoot={isArtist} draggable onDragStart={onDragStart}>
      <LibraryListFolder
        key={item.id}
        onClick={isArtist ? toggleAlbum : toggleSongs}
      >
        {renderFolderName()}
      </LibraryListFolder>
      {showAlbums &&
        Array.isArray(albums) &&
        albums.length > 0 &&
        albums.map((album, i) => (
          <LibraryList
            key={album.id}
            item={album}
            cover={item.coverUrl}
            isAlbum
          />
        ))}
      {showSongs &&
        Array.isArray(songs) &&
        songs.length > 0 &&
        songs.map((album, i) => (
          <LibraryList key={album.id} item={album} cover={item.coverUrl} />
        ))}
      {showAlbums &&
        files.length > 0 &&
        files.map((song, i) => (
          <LibraryItem key={`${song.name}-${i}`} item={song} />
        ))}
    </LibraryListContainer>
  );

  if (isArtist || isAlbum) {
    return renderArtistsAndAlbums();
  }
  return <LibraryItem item={item} cover={cover} hasAlbum />;
};

export default LibraryList;
