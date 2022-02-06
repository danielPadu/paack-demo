import {CombinedState, combineReducers} from 'redux';
import AppReducer from './appReducer';
import ModalReducer, {PayloadType} from './modalReducer';
import {RESET_STORE} from '../actions/actionTypes';
import {defaultReducer} from './default';
import FilesystemStorage from 'redux-persist-filesystem-storage';
export const reducerConfig = {
  timeout: 0, // The code base checks for falsy, so 0 disables
  key: 'root',
  storage: FilesystemStorage,
  whitelist: ['appReducer'],
  blacklist: ['modalReducer'],
};

const applicationReducer = combineReducers({
  appReducer: AppReducer,
  modalReducer: ModalReducer,
});

const RootReducer = (
  state:
    | CombinedState<{
        appReducer: typeof AppReducer;
        modalReducer: typeof ModalReducer;
      }>
    | undefined,
  action:
    | {
        type: string;
        payload:
          | string
          | boolean
          | typeof defaultReducer.appReducer.last_location;
      }
    | {type: string; payload?: PayloadType | undefined},
) => {
  let finalState = applicationReducer(state, action);
  if (action.type === RESET_STORE) {
    finalState = defaultReducer as typeof finalState;
  }
  return finalState;
};
export default RootReducer;
