import types from './types';

import produce from 'immer';

const INITIAL_STATE = {
    userForm: {},
    petForm: {sex: 'Male', category: 'Dog'},
    costForm: {type: 'Service'},
    user: {},
    pet: {},
    cost: {},
    ownerCost: {},
    form: {
        disabled: false,
        loading: false,
        saving: false,
    },  
};

function app(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_REDUCER: {
      return produce(state, (draft) => {
        draft[action.key] = action.payload;
      });
    }
    
    case types.SET_USER: {
      return produce(state, (draft) => {
        draft.userForm = { ...state.userForm, ...action.payload };
      });
    }

    case types.SET_PET: {
      return produce(state, (draft) => {
        draft.petForm = { ...state.petForm, ...action.payload };
      });
    }

    case types.SET_COST: {
      return produce(state, (draft) => {
        draft.costForm = { ...state.costForm, ...action.payload };
      });
    }

    case types.SET_FORM: {
      return produce(state, (draft) => {
        draft.form = { ...state.form, ...action.payload };
      });
    }
    
    case types.RESET: {
      return produce(state, (draft) => {
        draft[action.key] = INITIAL_STATE[action.key];
      });
    }

    default:
      return state;
  }
}

export default app;