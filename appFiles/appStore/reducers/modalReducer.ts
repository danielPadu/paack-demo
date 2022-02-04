import {
  LOADING_MODAL_OPEN,
  LOADING_MODAL_CLOSE,
  INFO_MODAL_OPEN,
  INFO_MODAL_CLOSE,
} from '../actions/actionTypes';
import {defaultReducer} from './default';
export type PayloadType = {isOpen: boolean; options: unknown};
export default (
  state = defaultReducer.modalReducer,
  action: {
    type: string;
    payload?: PayloadType;
  },
) => {
  switch (action.type) {
    case LOADING_MODAL_OPEN:
      return {
        ...state,
        loadingModal: {isOpen: true},
      };

    case LOADING_MODAL_CLOSE:
      return {
        ...state,
        loadingModal: {isOpen: false},
      };
    case INFO_MODAL_OPEN:
      return {
        ...state,
        infoModal: {
          isOpen: action?.payload?.isOpen,
          options: action?.payload?.options,
        },
      };

    case INFO_MODAL_CLOSE:
      return {
        ...state,
        infoModal: {isOpen: false, options: {}},
      };

    default:
      return state;
  }
};

export const getModalReducer = (state: any) => state.modalReducer;
