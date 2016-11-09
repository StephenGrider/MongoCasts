import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';

class ArtistDetail extends Component {
  componentWillMount() {
    this.props.findArtist(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.findArtist(nextProps.params.id);
    }
  }

  componentWillUnmount() {
    this.props.resetArtist();
  }

  onDeleteClick() {
    this.props.deleteArtist(this.props.params.id);
  }

  renderAlbums() {
    const { albums } = this.props.artist;

    if (!albums || !albums.map) { return; }

    return albums.map(album => {
      return (
        <div className="card album" key={album.title}>
          <div className="card-image">
            <img src={album.image} />
            <span className="card-title">
              <h4>{album.title}</h4>
            </span>
          </div>
          <div className="card-content">
            <div>
              <h5>{album.copiesSold}</h5>
              <i>copies sold</i>
            </div>
            <div>
              <h5>{album.numberTracks}</h5>
              <i>tracks</i>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.artist) { return <div>Todo: implement "FindArtist" query</div>; }

    const { artist: { name, age, genre, image, yearsActive, netWorth, labelName, _id } } = this.props;

    return (
      <div>
        <div className="spacer">
          <Link to="/">Back</Link>
          <Link to={`/artists/${_id}/edit`}>Edit</Link>
          <a onClick={this.onDeleteClick.bind(this)}>Delete</a>
        </div>
        <ul className="collection artist-detail">
          <li className="collection-item header">
            <div>
              <h3>{name}</h3>
              <h5>Master of {genre}</h5>
            </div>
            <image src={image} className="right" />
          </li>
          <li className="collection-item">
            <h5>{yearsActive}</h5>
            <p><i>Years Active</i></p>
          </li>
          <li className="collection-item">
            <h5>{age}</h5>
            <p><i>Years Old</i></p>
          </li>
          <li className="collection-item">
            <h5>${netWorth}</h5>
            <p><i>Net Worth</i></p>
          </li>
          <li className="collection-item">
            <h5>{labelName}</h5>
            <p><i>Label</i></p>
          </li>
          <li className="flex wrap">
            {this.renderAlbums()}
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ artists }) => {
  return { artist: artists.artist };
};

export default connect(mapStateToProps, actions)(ArtistDetail);
