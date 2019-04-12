import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';

import * as api from '../../lib/api';

const PENDER_TEST = 'base/PENDER_TEST';

export const penderTest = createAction(PENDER_TEST, api.getTest, meta => meta);

const initialState = Map({
  penderTest: null,
});

export default handleActions({
  ...pender({
    type: PENDER_TEST,
    onSuccess: (state, action) => state.set('penderTest', JSON.stringify(action.payload.data)),
    onError: (state, action) => console.log('*** ', JSON.stringify(action.payload)),
  }),
}, initialState);
