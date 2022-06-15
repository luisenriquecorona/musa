const baseUrl = window.location.origin;
const defaultHeaders = {
  "Content-Type": "application/json",
};

const get = async (path) => {
  return fetch(`${baseUrl}${path}`).then((response) => response.json());
};

const getByUrl = async (url) => {
  return fetch(url).then((response) => response.json());
};

const put = async (path, { body, headers = {} }) => {
  return fetch(`${baseUrl}${path}`, {
    method: "PUT",
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

const del = async (path) => {
  return fetch(`${baseUrl}${path}`, {
    method: "DELETE",
  });
};

const getSettings = async () => {
  return get("/state");
};

const insertSettings = async (settings) => {
  return put("/state", {
    body: {
      settings: {
        ...settings,
        isInit: null,
      },
    },
  });
};

const getAudioById = async (url) => {
  return getByUrl(url);
};

const getArtists = async () => {
  return get("/artists");
};

const getArtistById = async (url) => {
  return getByUrl(url);
};

const getArtistAlbums = async (id) => {
  return get(`/artist-albums/${id}`);
};

const getAlbumById = async (url) => {
  return getByUrl(url);
};

const getThemes = async () => {
  return get("/themes");
};

const getThemeById = async ({ id }) => {
  return get(`/theme/${id.split("/").pop()}`);
};

const insertTheme = async ({ id, colors }) => {
  return put(`/theme/${id.split("/").pop()}`, { body: { colors } });
};

const removeTheme = async ({ id }) => {
  return del(`/theme/${id}`);
};

const find = async (queryToBackend) => {
  return get(`/find/${queryToBackend}`);
};

const findRandom = async () => {
  return get("/find-random");
};

// Electron specific Apis

const addMusicLibraryPath = async () => {};

const getPlatform = async () => {};

const minimizeWindow = () => {};

const maximizeWindow = () => {};

const unmaximizeWindow = () => {};

const isWindowMaximized = async () => {};

const closeWindow = () => {};

const refreshLibrary = () => {};

const onInit = async () => {};

const addScanStartListener = (callback) => {};

const addScanUpdateListener = (callback) => {};

const addScanEndListener = (callback) => {};

const addScanCompleteListener = (callback) => {};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getSettings,
  insertSettings,
  getAudioById,
  getArtists,
  getArtistById,
  getArtistAlbums,
  getAlbumById,
  getThemes,
  getThemeById,
  insertTheme,
  removeTheme,
  find,
  findRandom,
  addMusicLibraryPath,
  getPlatform,
  minimizeWindow,
  maximizeWindow,
  unmaximizeWindow,
  isWindowMaximized,
  closeWindow,
  refreshLibrary,
  onInit,
  addScanStartListener,
  addScanUpdateListener,
  addScanEndListener,
  addScanCompleteListener,
};
