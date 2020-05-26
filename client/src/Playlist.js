import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import TrackInfo from "./TrackInfo";

class Playlist extends Component {
  constructor() {
    super();
    this.state = {
      chosenPlaylistTitle: "DJ App Test",
    };
  }

  render() {
    const { chosenPlaylistTitle } = this.state;
    const { playlistTracks } = this.props;
    if (!playlistTracks.length) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="App">
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

const mapStateToProps = ({ playlistTracks, tracksAudioFeatures }) => {
  return {
    playlistTracks,
    tracksAudioFeatures,
  };
};

export default connect(mapStateToProps)(Playlist);
