# Musa

UI for Musa-Electron.

## Todo

#### Frontend

- fix: Initial scan only showing the currently updated artist
- feat: Pause music if playlist is empty
- feat: Generate playlist (genre, random)
- feat: Support replaygain album gain
- feat: Persist playlist
- feat: Multiple playlists
- feat: Search
- feat: Scale cover images that are too high

#### Backend

#### Playlist

- feat: Rearrange playlist items with drag & drop
- feat: Highlight with border the index when rearranging / adding items
- feat: Scroll to active index if it goes out of viewport

#### Playlist 2.0

-feat: Create a smaller playlist with album covers

#### Library

- feat: Drag to specific index in playlist

#### Library 2.0

- feat: Create a different kind of library view that shows album covers
- feat: Recommend random music from library and show them nicely

#### Player

- fix: Bug where playback doesn't continue to items added later than the playback of the last element started

#### Settings

- feat: Customise music library folder path
- feat: Set Replaygain (track / album / off)

#### Themes

- feat: Create a theme library

#### General

- feat: Create an icon
- feat: Create a packaging script

## Done

##### 31.5.2019

- chore: update packages
- refactor: LibraryItem to function component
- refactor: Convert Library to function component

##### 29.5.2019

- refactor: Convert Cover to function component
- feat: Add progress bar component

##### 28.5.2019

- fix: Problem with filenames that have # chars in them
- feat: Add progress meter for initial scan
- feat: Send progress info to frontend during initial scan
- feat: Proper handling of active index

##### 27.5.2019

- feat: Cut items with Ctrl + X
- feat: Copy items with Ctrl + C
- feat: Paste items with Ctrl + V
- feat: Paste items above current index with Ctrl + Shift + V
- feat: Duplicate items with Ctrl + Shift + D
- feat: Create a new playlist from selected items + Enter
- feat: Select items with Ctrl + click

##### 24.5.2019

- feat: Select items with Shift + click
- feat: Select items with Shift + up / down
- fix: Seeking happening on mouse up as well

##### 15.3.2019

- feat: Make sure highlights have enough contrast compared to background and colors
- refactor: Remove redundant palette reducer

##### 14.3.2019

- feat: Add a button to settings to run initial scan again
- feat: Add settings view
- feat: Parse year from date if the date is an ISO date + add bit rate to metadata
- feat: Show DR gauge in player
- feat: Show pause icon in playlist when paused

##### 13.3.2019

- feat: Replay currently active song with Enter & Double Click
- feat: Start playing item with Enter
- feat: Move active index up / down with keyboard
- feat: Improve mouse selection in playlist
- feat: Select all with Ctrl + A in playlist

##### 12.3.2019

- feat: Watch for image file changes as well
- feat: Select multiple songs in playlist
- feat: Close library when clicking outside of it
- feat: Drag & drop from library to playlist

##### 7.3.2019

- refactor: replace Radium with CSS Variables

##### 1.3.2019

- refactor: separate cover to its own component
- refactor: move player to toolbar

##### 28.2.2019

- feat: Add currently playing song info to document title
- fix: A bug where Electron Helper starts using tons of CPU

```
It was caused by Chokidar not being able to use the native FSEvents
module for Mac and it falling back to polling.
See: https://github.com/paulmillr/chokidar/issues/447

Fixed the issue by rebuilding fsevents with electron-rebuild.
```

- fix: Don't blow up if song metadata can't be read

##### 27.2.2019

- feat: start implementing color scheme by album cover
- fix: dont blow up if folder has no songs + see if not recreating TaskPool all the time helps with Electron CPU usage

##### 26.2.2019

- feat: improve album cover scanning

##### 22.2.2019

- feat: Show / hide library
- feat: new kickass layout
- feat: Add all artist or album songs to playlist by double clicking

##### 21.2.2019

- refactor: replace child_process fork with electron-remote
- feat: update new visual look
- feat: Add path to album cover
- fix: Bug where playback resumes from beginning after pausing (seems to be fixed)

##### 19.2.2019

- feat: Persist volume to localStorage
- feat: Start creating a new visual look

##### 18.2.2019

- feat: Add watchers for adding, modifying & removing of files in library
- feat: Change font to Tahoma
- feat: Add new songs to library during startup
- feat: Remove deleted songs from library during startup
- feat: Update modified songs in library during startup

##### 16.2.2019

- feat: Use chokidar for initial scan
- feat: Use IndexedDB in front for persistence of library

##### 15.2.2019

- refactor: Restructure library listing data
- feat: Consolidate multiple disc album directories to one album dir
- feat: Get artist / album name from directory songs' metadata
- refactor: Remove NeDB and other big dependencies
- feat: Persist library to IndexedDB

##### 14.2.2019

- feat: Prevent scroll with space bar
- feat: Mute / Unmute with volume button & M key

##### 13.2.2019

- feat: Set volume by replaygain
- fix: Bug where play and seek input onChange handlers fire twice
- feat: Play / Pause with space bar
- fix: Duration formatting
- feat: Remove zero prefix if duration is under 10 min
- feat: Add steps to volume and seek range inputs

##### 12.2.2019

- feat: Tweak playlist styles
- feat: Volume icon to player
- feat: Indicate duration in player (played / duration)
- feat: Indicate currently playing song in playlist
- feat: Parse duration to 00:00:00 format
- feat: Parse track metadata to [disc.]track / total tracks
- feat: Use song metadata in front
- feat: Better song metadata parsing

##### 11.2.2019

- feat: Read metadata from songs in backend
- feat: Remove song from playlist
