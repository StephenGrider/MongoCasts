import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Paginator from './Paginator';
import * as actions from '../../actions';

class ArtistIndex extends Component {
  onChange(_id) {
    if (_.contains(this.props.selection, _id)) {
      this.props.deselectArtist(_id);
    } else {
      this.props.selectArtist(_id);
    }
  }

  renderList(artist) {
    const { _id } = artist;
    const classes = `collection-item avatar ${artist.retired && 'retired'}`;

    return (
      <li className={classes} key={_id}>
        <div>
          <input
            id={_id}
            type="checkbox"
            checked={_.contains(this.props.selection, _id)}
            onChange={() => this.onChange(_id)}
          />
          <label htmlFor={_id} />
        </div>
        <img src={artist.image} className="circle" />
        <div>
          <span className="title">
            <strong>{artist.name}</strong>
          </span>
          <p>
            <b>{artist.age}</b> years old
            <br />
            {artist.albums ? artist.albums.length : 0} albums released
          </p>
        </div>
        <Link to={`artists/${artist._id}`} className="secondary-content">
           <i className="material-icons">play_arrow</i>
         </Link>
      </li>
    );
  }

  renderPaginator() {
    if (this.props.artists.all.length) {
      return <Paginator />;
    }
  }

  renderEmptyCollection() {
    if (this.props.artists.all.length) { return; }

    return (
      <div className="center-align">
        <h5>No records found!</h5>
        <div>Try searching again</div>
      </div>
    );
  }

  renderRetire() {
    if (this.props.selection.length) {
      return (
        <div>
          <button
            className="btn"
            onClick={() => this.props.setRetired(this.props.selection)}
          >
            Retire
          </button>
          <button
            className="btn"
            onClick={() => this.props.setNotRetired(this.props.selection)}
          >
            Unretire
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderRetire()}
        <ul className="collection">
          {this.props.artists.all.map(this.renderList.bind(this))}
          {this.renderEmptyCollection()}
        </ul>

        {this.renderPaginator()}
      </div>
    );
  }
}

const mapStateToProps = ({ artists, selection }) => ({ artists, selection });

export default connect(mapStateToProps, actions)(ArtistIndex);
