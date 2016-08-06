import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import donate from './donate';
import charities from './charities';

const rootReducer = combineReducers({
  donate,
  charities,
  routing: routerReducer
})

export default rootReducer;
