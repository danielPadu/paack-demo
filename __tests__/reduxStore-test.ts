import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setAllowGeolocation,
  setAppActiveDeliveryID,
  setAppActiveScreen,
  setLastLocation,
} from '../appFiles/appStore/actions/appActions';
import {
  infoModalClose,
  infoModalOpen,
  loadingModalClose,
  loadingModalOpen,
} from '../appFiles/appStore/actions/modalActions';
import {defaultReducer} from '../appFiles/appStore/reducers/default';
import modalReducer from '../appFiles/appStore/reducers/modalReducer';
import appReducer from '../appFiles/appStore/reducers/appReducer';
import rootReducer from '../appFiles/appStore/reducers/index';
import * as actionTypes from '../appFiles/appStore/actions/actionTypes';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('modal actions trigger', () => {
  const store = mockStore(defaultReducer.modalReducer);
  test('Modal Actions loadingModalOpen type is dispatched correctly', () => {
    const expected = [{type: 'LOADING_MODAL_OPEN'}];
    store.dispatch(loadingModalOpen());
    expect(store.getActions()).toEqual(expected);
  });
  test('Modal Actions loadingModalClose type is dispatched correctly', () => {
    const expected = [
      {
        type: 'LOADING_MODAL_OPEN',
      },
      {
        type: 'LOADING_MODAL_CLOSE',
      },
    ];
    store.dispatch(loadingModalClose());
    expect(store.getActions()).toEqual(expected);
  });
  test('Modal Actions infoModalOpen type is dispatched correctly', () => {
    const expected = [
      {
        type: 'LOADING_MODAL_OPEN',
      },
      {
        type: 'LOADING_MODAL_CLOSE',
      },
      {
        type: 'INFO_MODAL_OPEN',
        payload: {
          title: 'some title',
          description: 'some description',
        },
      },
    ];
    store.dispatch(
      infoModalOpen({title: 'some title', description: 'some description'}),
    );

    expect(store.getActions()).toEqual(expected);
  });
  test('Modal Actions infoModalClose type is dispatched correctly', () => {
    const expected = [
      {
        type: 'LOADING_MODAL_OPEN',
      },
      {
        type: 'LOADING_MODAL_CLOSE',
      },
      {
        type: 'INFO_MODAL_OPEN',
        payload: {
          title: 'some title',
          description: 'some description',
        },
      },
      {
        type: 'INFO_MODAL_CLOSE',
      },
    ];
    store.dispatch(infoModalClose());

    expect(store.getActions()).toEqual(expected);
  });
});
describe('modalReducer functionallity', () => {
  it('should return the initial state', () =>
    expect(modalReducer(undefined, defaultReducer.modalReducer)).toEqual(
      defaultReducer.modalReducer,
    ));

  it('modalReducer is handling LOADING_MODAL_OPEN correctly', () => {
    const startAction = {
      type: actionTypes.LOADING_MODAL_OPEN,
    };
    expect(
      modalReducer(
        {
          ...defaultReducer.modalReducer,
          loadingModal: {
            isOpen: false,
          },
        },
        startAction,
      ),
    ).toEqual({
      ...defaultReducer.modalReducer,
      loadingModal: {
        isOpen: true,
      },
    });
  });
  it('modalReducer is handling LOADING_MODAL_CLOSE correctly', () => {
    const startAction = {
      type: actionTypes.LOADING_MODAL_CLOSE,
    };
    expect(
      modalReducer(
        {
          ...defaultReducer.modalReducer,
          loadingModal: {
            isOpen: true,
          },
        },
        startAction,
      ),
    ).toEqual({
      ...defaultReducer.modalReducer,
      loadingModal: {
        isOpen: false,
      },
    });
  });
  it('modalReducer is handling INFO_MODAL_OPEN correctly', () => {
    const startAction = {
      type: actionTypes.INFO_MODAL_OPEN,
    };
    expect(
      modalReducer(
        {
          ...defaultReducer.modalReducer,
          infoModal: {
            isOpen: true,
            options: {},
          },
        },
        startAction,
      ),
    ).toEqual({
      ...defaultReducer.modalReducer,
      infoModal: {
        isOpen: true,
        options: undefined,
      },
    });
  });
  it('modalReducer is handling INFO_MODAL_CLOSE correctly', () => {
    const startAction = {
      type: actionTypes.INFO_MODAL_CLOSE,
    };
    expect(
      modalReducer(
        {
          ...defaultReducer.modalReducer,
          infoModal: {
            isOpen: true,
            options: {},
          },
        },
        startAction,
      ),
    ).toEqual({
      ...defaultReducer.modalReducer,
      infoModal: {
        isOpen: false,
        options: {},
      },
    });
  });
});
describe('app actions trigger', () => {
  const store = mockStore(defaultReducer.appReducer);
  test('App Actions setAllowGeolocation type is dispatched correctly', () => {
    const expected = [{type: 'SET_ALLOW_GEOLOCATION', payload: true}];

    store.dispatch(setAllowGeolocation(true));
    expect(store.getActions()).toEqual(expected);
  });
  test('App Actions setAppActiveDeliveryID type is dispatched correctly', () => {
    const expected = [
      {type: 'SET_ALLOW_GEOLOCATION', payload: true},
      {type: 'SET_ACTIVE_DELIVERY_ID', payload: '111'},
    ];
    store.dispatch(setAppActiveDeliveryID('111'));
    expect(store.getActions()).toEqual(expected);
  });
  test('App Actions setAppActiveScreen type is dispatched correctly', () => {
    const expected = [
      {type: 'SET_ALLOW_GEOLOCATION', payload: true},
      {type: 'SET_ACTIVE_DELIVERY_ID', payload: '111'},
      {type: 'SET_ACTIVE_SCREEN', payload: 'CurrentScreen'},
    ];
    store.dispatch(setAppActiveScreen('CurrentScreen'));
    expect(store.getActions()).toEqual(expected);
  });
  test('App Actions setLastLocation type is dispatched correctly', () => {
    const mockedLocation = {
      accuracy: 11,
      altitude: 330,
      altitudeAccuracy: 5,
      heading: 10,
      latitude: 77,
      longitude: 88,
      speed: 10,
    };

    const expected = [
      {type: 'SET_ALLOW_GEOLOCATION', payload: true},
      {type: 'SET_ACTIVE_DELIVERY_ID', payload: '111'},
      {type: 'SET_ACTIVE_SCREEN', payload: 'CurrentScreen'},
      {type: 'SET_LAST_LOCATION', payload: mockedLocation},
    ];
    store.dispatch(setLastLocation(mockedLocation));
    expect(store.getActions()).toEqual(expected);
  });
});
describe('appReducer functionallity', () => {
  it('should return the initial state', () =>
    expect(appReducer(undefined, defaultReducer.appReducer)).toEqual(
      defaultReducer.appReducer,
    ));

  it('appReducer is handling SET_ALLOW_GEOLOCATION correctly', () => {
    const startAction = {
      type: actionTypes.SET_ALLOW_GEOLOCATION,
      payload: true,
    };
    expect(
      appReducer(
        {
          ...defaultReducer.appReducer,
          app_allow_geolocation: false,
        },
        startAction,
      ),
    ).toEqual({
      ...defaultReducer.appReducer,
      app_allow_geolocation: true,
    });
  });
  it('appReducer is SET_ACTIVE_DELIVERY_ID correctly', () => {
    const startAction = {
      type: actionTypes.SET_ACTIVE_DELIVERY_ID,
      payload: '111',
    };
    expect(
      appReducer(
        {
          ...defaultReducer.appReducer,
          active_delivery_id: '',
        },
        startAction,
      ),
    ).toEqual({
      ...defaultReducer.appReducer,
      active_delivery_id: '111',
    });
  });
  it('appReducer is SET_ACTIVE_SCREEN correctly', () => {
    const startAction = {
      type: actionTypes.SET_ACTIVE_SCREEN,
      payload: 'CurrentScreen',
    };
    expect(
      appReducer(
        {
          ...defaultReducer.appReducer,
          active_scren: '',
        },
        startAction,
      ),
    ).toEqual({
      ...defaultReducer.appReducer,
      active_scren: 'CurrentScreen',
    });
  });
  it('appReducer is SET_LAST_LOCATION correctly', () => {
    const startAction = {
      type: actionTypes.SET_LAST_LOCATION,
      payload: {
        accuracy: 10,
        altitude: 10,
        altitudeAccuracy: 10,
        heading: 10,
        latitude: 10,
        longitude: 10,
        speed: 10,
      },
    };
    expect(
      appReducer(
        {
          ...defaultReducer.appReducer,
          last_location: {
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            latitude: 0,
            longitude: 0,
            speed: 0,
          },
        },
        startAction,
      ),
    ).toEqual({
      ...defaultReducer.appReducer,
      last_location: {
        accuracy: 10,
        altitude: 10,
        altitudeAccuracy: 10,
        heading: 10,
        latitude: 10,
        longitude: 10,
        speed: 10,
      },
    });
  });
});
describe('rootReducer functionallity', () => {
  it('rootReducer is handling RESET_STORE correctly', () => {
    const startAction = {
      type: actionTypes.RESET_STORE,
    };
    expect(
      rootReducer(
        {
          appReducer: {} as typeof appReducer,
          modalReducer: {} as typeof modalReducer,
        },
        startAction,
      ),
    ).toEqual({
      appReducer: {...defaultReducer.appReducer},
      modalReducer: {...defaultReducer.modalReducer},
    });
  });
});
