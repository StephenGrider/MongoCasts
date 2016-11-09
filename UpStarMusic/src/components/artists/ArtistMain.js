import React, { Component } from 'react';
import ArtistFilter from './ArtistFilter';
import ArtistIndex from './ArtistIndex';

class ArtistMain extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s4">
          <ArtistFilter />
        </div>
        <div className="col s8">
          <ArtistIndex />
        </div>
      </div>
    );
  }
}

export default ArtistMain;
