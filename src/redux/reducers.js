import _ from 'lodash';
import * as constants from './constants';
import initialState from '.';
import * as weatherService from '../services/weather';

export const cityReducer = (state = initialState.city, action) => {
  switch (action.type) {
    case constants.SET_CURRENT_CITY:
      return action.data;
    case constants.RESET_CURRENT_CITY:
      return {};
    default:
      return state;
  }
};

export const forcastReducer = (state = initialState.forcast, action) => {
  switch (action.type) {
    case constants.FETCH_CITY_FORCAST_SUCCESS: {
      const filteredData = _.filter(action.data.list, o => o.dt_txt.includes('12:00:00'));
      const mappedData = _.map(filteredData, day => weatherService.mapModelToView(day));

      return mappedData;
    }

    case constants.FETCH_CITY_FORCAST_FAILURE:
      return state;

    case constants.RESET_FORCAST:
      return action.data;

    default:
      return state;
  }
};
