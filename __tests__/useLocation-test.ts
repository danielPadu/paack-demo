import {act, renderHook} from '@testing-library/react-hooks';
import useLocation from '../appFiles/hooks/useLocation';
jest.mock('react-native-permissions', () => ({
  check: _ => Promise.resolve('granted'),
  request: _ => 'granted',
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({app_allow_geolocation: true, last_location: {}}),
  useDispatch: () => jest.fn(),
}));

describe('useLocation test', () => {
  it('Should return initial  values in jest env ', () => {
    const {result, rerender} = renderHook(() => useLocation());
    const {location, permissionResult, getLocation} = result.current;
    expect(location).not.toBeDefined();
    expect(permissionResult).toEqual('');
    expect(getLocation).toBeDefined();
    expect(typeof getLocation).toBe('function');

    act(() => {
      result.current.getLocation();
    });
    rerender({permissionResult: 'granted'});
  });
});
