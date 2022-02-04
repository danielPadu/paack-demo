import {appDefault} from './appReducerDefault';
import {modalDefault} from './modalReducerDefault';
export const defaultReducer = {
  appReducer: appDefault, //persistence: not to be in black list if settings should persist
  modalReducer: modalDefault,
};
