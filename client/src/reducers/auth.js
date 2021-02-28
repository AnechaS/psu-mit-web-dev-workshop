import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  authToken: '',
  user: undefined,
};

export default persistReducer(
  {
    storage,
    key: 'auth',
    whitelist: ['authToken', 'user'],
  },
  function reducer(state = initialState, action) {
    switch (action.type) {
      case 'AUTHENTICATION_LOGIN': {
        const { authToken, user } = action.payload;
        return { authToken, user };
      }
      case 'AUTHENTICATION_LOGOUT': {
        return initialState;
      }
      default: {
        return state;
      }
    }
  }
);
