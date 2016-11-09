import _ from 'lodash';
import { hashHistory } from 'react-router';
import {
  SET_AGE_RANGE,
  SET_YEARS_ACTIVE_RANGE,
  SEARCH_ARTISTS,
  FIND_ARTIST,
  RESET_ARTIST,
  CREATE_ERROR,
  CLEAR_ERROR,
  DESELECT_ARTIST,
  SELECT_ARTIST,
  RESET_SELECTION
} from './types';

import GetAgeRange from '../../database/queries/GetAgeRange';
import GetYearsActiveRange from '../../database/queries/GetYearsActiveRange';
import SearchArtists from '../../database/queries/SearchArtists';
import FindArtist from '../../database/queries/FindArtist';
import CreateArtist from '../../database/queries/CreateArtist';
import EditArtist from '../../database/queries/EditArtist';
import DeleteArtist from '../../database/queries/DeleteArtist';
import SetRetired from '../../database/queries/SetRetired';
import SetNotRetired from '../../database/queries/SetNotRetired';

export const resetArtist = () => {
  return { type: RESET_ARTIST };
};

export const clearError = () => {
  return { type: CLEAR_ERROR };
};

export const selectArtist = id => {
  return { type: SELECT_ARTIST, payload: id };
};

export const deselectArtist = id => {
  return { type: DESELECT_ARTIST, payload: id };
};

export const setRetired = ids => (dispatch, getState) =>
  SetRetiredProxy(ids.map(id => id.toString()))
    .then(() => dispatch({ type: RESET_SELECTION }))
    .then(() => refreshSearch(dispatch, getState));

export const setNotRetired = ids => (dispatch, getState) =>
  SetNotRetiredProxy(ids.map(id => id.toString()))
    .then(() => dispatch({ type: RESET_SELECTION }))
    .then(() => refreshSearch(dispatch, getState));

export const setAgeRange = () => dispatch =>
  GetAgeRangeProxy()
    .then(result =>
      dispatch({ type: SET_AGE_RANGE, payload: result })
    );

export const setYearsActiveRange = () => dispatch =>
  GetYearsActiveRangeProxy()
    .then(result =>
      dispatch({ type: SET_YEARS_ACTIVE_RANGE, payload: result })
    );

export const searchArtists = (...criteria) => dispatch =>
  SearchArtistsProxy(...criteria)
    .then((result = []) =>
      dispatch({ type: SEARCH_ARTISTS, payload: result })
    );

export const findArtist = id => dispatch =>
  FindArtistProxy(id)
    .then(artist =>
      dispatch({ type: FIND_ARTIST, payload: artist })
    );

export const createArtist = props => dispatch =>
  CreateArtistProxy(props)
    .then(artist => {
      hashHistory.push(`artists/${artist.id}`);
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });

export const editArtist = (id, props) => dispatch =>
  EditArtistProxy(id, props)
    .then(() => hashHistory.push(`artists/${id}`))
    .catch(error => {
      console.log(error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });

export const deleteArtist = (id) => dispatch =>
  DeleteArtistProxy(id)
    .then(() => hashHistory.push('/'))
    .catch(error => {
      console.log(error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });


//
// Faux Proxies

const GetAgeRangeProxy = (...args) => {
  const result = GetAgeRange(...args);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const GetYearsActiveRangeProxy = (...args) => {
  const result = GetYearsActiveRange(...args);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const SearchArtistsProxy = (criteria, offset, limit) => {
  const result = SearchArtists(_.omit(criteria, 'sort'), criteria.sort, offset, limit);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const FindArtistProxy = (...args) => {
  const result = FindArtist(...args);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const CreateArtistProxy = (...args) => {
  const result = CreateArtist(...args);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const EditArtistProxy = (...args) => {
  const result = EditArtist(...args);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const DeleteArtistProxy = (...args) => {
  const result = DeleteArtist(...args);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const SetRetiredProxy = (_ids) => {
  const result = SetRetired(_ids);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const SetNotRetiredProxy = (_ids) => {
  const result = SetNotRetired(_ids);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

//
// Helpers

const refreshSearch = (dispatch, getState) => {
  const { artists: { offset, limit } } = getState();
  const criteria = getState().form.filters.values;

  dispatch(searchArtists({ name: '', ...criteria }, offset, limit));
};
