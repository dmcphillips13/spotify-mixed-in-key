import Spotify from "spotify-web-api-js";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunks from "redux-thunk";
import { createLogger } from "redux-logger";

const spotifyWebApi = new Spotify();

// ACTIONS
const LOAD_PLAYLISTS = "LOAD_PLAYLISTS";
const LOAD_PLAYLIST_TRACKS = "LOAD_PLAYLIST_TRACKS";
const LOAD_SELECTED_TRACK = "LOAD_SELECTED_TRACK";
const LOAD_TRACKS_AUDIO_FEATURES = "LOAD_TRACKS_AUDIO_FEATURES";

// ACTION CREATORS
const _loadPlaylists = (playlists) => ({ type: LOAD_PLAYLISTS, playlists });
const _loadPlaylistTracks = (playlistTracks) => ({
  type: LOAD_PLAYLIST_TRACKS,
  playlistTracks,
});
const _loadSelectedTrack = (selectedTrack) => ({
  type: LOAD_SELECTED_TRACK,
  selectedTrack,
});
const _loadTracksAudioFeatures = (tracksAudioFeatures) => ({
  type: LOAD_TRACKS_AUDIO_FEATURES,
  tracksAudioFeatures,
});

// THUNKS
const loadPlaylists = () => {
  return async (dispatch) => {
    const response = await spotifyWebApi.getUserPlaylists();
    dispatch(_loadPlaylists(response));
  };
};

const loadPlaylistTracks = (id) => {
  return async (dispatch) => {
    const response = await spotifyWebApi.getPlaylistTracks(id);
    dispatch(_loadPlaylistTracks(response.items));
  };
};

const loadSelectedTrack = (id) => {
  return async (dispatch) => {
    const response = await spotifyWebApi.getTrack(id);
    dispatch(_loadSelectedTrack(response));
  };
};

const loadTracksAudioFeatures = (tracksIds) => {
  return async (dispatch) => {
    const response = await spotifyWebApi.getAudioFeaturesForTracks(tracksIds);
    dispatch(_loadTracksAudioFeatures(response.audio_features));
  };
};

// REDUCERS
const playlistsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PLAYLISTS:
      return action.playlists;

    default:
      return state;
  }
};

const playlistTracksReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PLAYLIST_TRACKS:
      return action.playlistTracks;

    default:
      return state;
  }
};

const selectedTrackReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SELECTED_TRACK:
      return action.selectedTrack;

    default:
      return state;
  }
};

const tracksAudioFeaturesReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_TRACKS_AUDIO_FEATURES:
      return action.tracksAudioFeatures;

    default:
      return state;
  }
};

const reducer = combineReducers({
  playlists: playlistsReducer,
  playlistTracks: playlistTracksReducer,
  selectedTrack: selectedTrackReducer,
  tracksAudioFeatures: tracksAudioFeaturesReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunks, createLogger({ collapsed: true }))
);

export default store;

export {
  loadPlaylists,
  loadPlaylistTracks,
  loadSelectedTrack,
  loadTracksAudioFeatures,
};
