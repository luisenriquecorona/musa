import React, { Component } from "react";
import { connect } from "react-redux";
import LibraryItem from "./LibraryItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flatten } from "lodash-es";
import { addToPlaylist } from "../reducers/player.reducer";
import "./LibraryList.scss";

class LibraryList extends Component {
  state = {
    showFolderItems: false
  };

  render() {
    const item = this.props.item;
    const dispatch = this.props.dispatch;
    const isArtist = Array.isArray(item.albums);
    const isAlbum = Array.isArray(item.songs);
    const isUndefinedItemName = item.name === "undefined";
    if (isArtist || isAlbum) {
      return isUndefinedItemName ? (
        item.songs.map(song => (
          <LibraryItem key={song.name + "-" + Date.now()} item={song} />
        ))
      ) : (
        <ul className="library-list">
          <li
            className="library-list-folder"
            key={item.name}
            onClick={this.toggleFolder.bind(this)}
            onDoubleClick={() =>
              this.addArtistOrAlbumToPlaylist(dispatch, item, isArtist, isAlbum)
            }
          >
            {parseInt(item.date, 10) === 0 && (
              <FontAwesomeIcon className="caret-right" icon="caret-right" />
            )}
            {isAlbum && parseInt(item.date, 10) > 0
              ? `${item.date} - ${item.name}`
              : item.name}
          </li>
          {this.state.showFolderItems &&
            (item.albums || item.songs).map(child => (
              <LibraryList
                key={child.name + "-" + Date.now()}
                item={child}
                cover={item.cover}
                dispatch={this.props.dispatch}
              />
            ))}
        </ul>
      );
    }
    return (
      <LibraryItem
        key={item.name + "-" + Date.now()}
        item={item}
        cover={this.props.cover}
      />
    );
  }

  toggleFolder(event) {
    event.preventDefault();
    this.setState({
      showFolderItems: !this.state.showFolderItems
    });
  }

  addArtistOrAlbumToPlaylist(dispatch, item, isArtist, isAlbum) {
    if (isArtist)
      return flatten(item.albums.map(a => a.songs)).forEach(song =>
        this.props.dispatch(addToPlaylist(song))
      );
    if (isAlbum)
      return item.songs.forEach(song =>
        this.props.dispatch(addToPlaylist(song))
      );
  }
}

export default connect(
  () => ({}),
  dispatch => ({ dispatch })
)(LibraryList);
