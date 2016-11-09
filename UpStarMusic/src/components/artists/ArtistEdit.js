import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ArtistEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.props.findArtist(this.props.params.id);
  }

  componentWillReceiveProps({ artist }) {
    if (artist) {
      const { name, age, yearsActive, genre } = artist;

      this.setState({ name, age, yearsActive, genre });
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.findArtist(nextProps.params.id);
    }
  }

  componentWillUnmount() {
    this.props.clearError();
  }

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.props.editArtist(this.props.params.id, this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="input-field">
          <input
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name"
          />
        </div>
        <div className="input-field">
          <input
            value={this.state.age}
            onChange={e => this.setState({ age: e.target.value })}
            placeholder="Age"
          />
        </div>
        <div className="input-field">
          <input
            value={this.state.yearsActive}
            onChange={e => this.setState({ yearsActive: e.target.value })}
            placeholder="Years Active"
          />
        </div>
        <div className="input-field">
          <input
            value={this.state.genre}
            onChange={e => this.setState({ genre: e.target.value })}
            placeholder="Genre"
          />
        </div>
        <div className="has-error">
          {this.props.errorMessage}
        </div>
        <button className="btn">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    artist: state.artists.artist,
    errorMessage: state.errors
  };
};

export default connect(mapStateToProps, actions)(ArtistEdit);
