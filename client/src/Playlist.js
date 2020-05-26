import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import TrackInfo from "./TrackInfo";
import {
  loadPlaylists,
  loadPlaylistTracks,
  loadTracksAudioFeatures,
} from "./store";

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      chosenPlaylistTitle: "DJ App Test",
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.getPlaylists();

    const chosenPlaylist = await this.props.playlists.items.find(
      (playlist) => playlist.name === this.state.chosenPlaylistTitle
    );

    await this.props.getPlaylistTracks(chosenPlaylist.id);

    const tracksIds = await this.props.playlistTracks.map((trackObject) => {
      return trackObject.track.id;
    });

    await this.props.getTracksAudioFeatures(tracksIds);
  }

  async onSubmit(event) {
    event.preventDefault();
    try {
      const chosenPlaylist = await this.props.playlists.items.find(
        (playlist) => playlist.name === this.state.chosenPlaylistTitle
      );

      await this.props.getPlaylistTracks(chosenPlaylist.id);

      const tracksIds = await this.props.playlistTracks.map((trackObject) => {
        return trackObject.track.id;
      });

      await this.props.getTracksAudioFeatures(tracksIds);
    } catch (exception) {
      console.log(exception);
    }
  }

  render() {
    const { onSubmit } = this;
    const { chosenPlaylistTitle } = this.state;
    const { playlistTracks, playlists } = this.props;
    if (!playlistTracks.length) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="App">
        <form onSubmit={onSubmit}>
          <select
            value={chosenPlaylistTitle}
            onChange={(event) =>
              this.setState({ chosenPlaylistTitle: event.target.value })
            }
          >
            {playlists.items.map((playlist) => (
              <option value={playlist.name} key={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>
          <button>Select</button>
        </form>
        <h1>{chosenPlaylistTitle}</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>BPM</th>
              <th>Key</th>
              <th>Energy</th>
              <th>Danceability</th>
            </tr>
          </thead>
          <tbody>
            {playlistTracks.map((trackObject) => {
              return (
                <TrackInfo
                  key={trackObject.track.id}
                  match={this.props.match}
                  {...trackObject.track}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

// const mapStateToProps = ({ playlistTracks, tracksAudioFeatures }) => {
//   return {
//     playlistTracks,
//     tracksAudioFeatures,
//   };
// };

const mapStateToProps = ({
  playlists,
  playlistTracks,
  tracksAudioFeatures,
}) => {
  return {
    playlists,
    playlistTracks,
    tracksAudioFeatures,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaylists: () => dispatch(loadPlaylists()),
    getPlaylistTracks: (id) => dispatch(loadPlaylistTracks(id)),
    getTracksAudioFeatures: (tracksIds) =>
      dispatch(loadTracksAudioFeatures(tracksIds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
