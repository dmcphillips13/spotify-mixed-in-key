import Spotify from "spotify-web-api-js";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunks from "redux-thunk";
import { createLogger } from "redux-logger";

const spotifyWebApi = new Spotify();

// ACTIONS
const LOAD_PLAYLISTS = "LOAD_PLAYLISTS";
const LOAD_PLAYLIST_TRACKS = "LOAD_PLAYLIST_TRACKS";
const LOAD_TRACK_AUDIO_FEATURES = "LOAD_TRACK_AUDIO_FEATURES";

// ACTION CREATORS
const _loadPlaylists = (playlists) => ({ type: LOAD_PLAYLISTS, playlists });
const _loadPlaylistTracks = (playlistTracks) => ({
  type: LOAD_PLAYLIST_TRACKS,
  playlistTracks,
});
const _loadTrackAudioFeatures = (trackAudioFeatures) => ({
  type: LOAD_TRACK_AUDIO_FEATURES,
  trackAudioFeatures,
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

const loadTrackAudioFeatures = (id) => {
  return async (dispatch) => {
    const response = await spotifyWebApi.getAudioFeaturesForTrack(id);
    dispatch(_loadTrackAudioFeatures(response));
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

const trackAudioFeaturesReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_TRACK_AUDIO_FEATURES:
      return action.trackAudioFeatures;

    default:
      return state;
  }
};

const reducer = combineReducers({
  playlists: playlistsReducer,
  playlistTracks: playlistTracksReducer,
  trackAudioFeatures: trackAudioFeaturesReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunks, createLogger({ collapsed: true }))
);

export default store;

export { loadPlaylists, loadPlaylistTracks, loadTrackAudioFeatures };
