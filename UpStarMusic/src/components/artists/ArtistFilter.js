import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Range } from '../filters';
import * as actions from '../../actions';

const TEXT_FIELDS = [
  { label: 'Name', prop: 'name' }
];

class ArtistFilter extends Component {
  componentWillMount() {
    if (this.props.filters) {
      this.props.searchArtists({
        name: '',
        ...this.props.filters
      });
    } else {
      this.props.searchArtists({
        name: '',
        sort: 'name'
      });
    }
  }

  componentDidMount() {
    this.props.setAgeRange();
    this.props.setYearsActiveRange();
  }

  handleSubmit(formProps) {
    this.props.searchArtists({
      name: '',
      ...formProps
    });
  }

  renderInputs() {
    return TEXT_FIELDS.map(({ label, prop }) =>
      <div className="input-field" key={prop}>
        <Field
          placeholder={label}
          id={prop}
          name={prop}
          component="input"
          type="text"
        />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="card blue-grey darken-1 row">
        <div className="card-content white-text">
          <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
            <div className="center-align card-title">
              Search
            </div>

            {this.renderInputs()}

            <div className="input-field">
              <Field
                id="age"
                label="Age"
                component={Range}
                type="text"
                name="age"
                range={this.props.ageRange}
              />
            </div>

            <div className="input-field">
              <Field
                id="years-active"
                label="Years Active"
                component={Range}
                type="text"
                name="yearsActive"
                range={this.props.yearsActive}
              />
            </div>

            <div>
              <label className="select" htmlFor="sort">Sort By</label>
              <Field id="sort" name="sort" component="select">
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="albums">Albums Released</option>
              </Field>
            </div>

            <div className="center-align">
              <button className="btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { filterCriteria } = state;

  return {
    yearsActive: filterCriteria.yearsActive,
    ageRange: filterCriteria.age,
    filters: state.form.filters && state.form.filters.values
  };
};

export default connect(mapStateToProps, actions)(reduxForm({
  destroyOnUnmount: false,
  form: 'filters',
  initialValues: { sort: 'name' }
})(ArtistFilter));
