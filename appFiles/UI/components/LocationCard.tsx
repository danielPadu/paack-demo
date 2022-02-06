import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {Button, Card, Colors} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import useLocation from '../../hooks/useLocation';
import {RenderField} from './RenderField';

Colors.loadColors({
  primaryColor: '#2364AA',
  secondaryColor: '#81C3D7',
  textColor: '#221D23',
  errorColor: '#E63B2E',
  successColor: '#ADC76F',
  warnColor: '#FF963C',
});

export const LocationCard = () => {
  const {app_allow_geolocation, last_location} = useSelector(
    (state: any) => state.appReducer,
  );
  const {getLocation} = useLocation();
  const {
    cardContainer,
    cardTitleContainer,
    clientText,
    cardStyle,
    emptyContentText,
    refreshButtonContainer,
    changeStatusButtonStyle,
  } = styles;

  const [refreshingLoading, setRefreshingLoading] = useState(false);

  const getCoordsColor = () => ({
    color: 'green',
    fontSize: 12,
    fontWeight: '900',
  });

  const makeActiveLoadingIndicator = useCallback(() => {
    const {refreshButtonLoadingStyle} = styles;
    return refreshingLoading ? (
      <ActivityIndicator
        testID="activity-indicator"
        style={refreshButtonLoadingStyle}
        size="small"
        color="#0000ff"
      />
    ) : null;
  }, [refreshingLoading]);

  const onRefreshLocationPress = () => {
    setRefreshingLoading(true);
    getLocation().then(() => {
      setRefreshingLoading(false);
    });
  };

  return (
    <View style={cardContainer}>
      {app_allow_geolocation && last_location ? (
        <Card
          row={false}
          style={cardStyle}
          enableShadow={true}
          useNative
          activeOpacity={1}>
          <View style={cardTitleContainer}>
            <Text style={clientText}>
              {'Last location details registered '}
            </Text>
          </View>

          <RenderField title={'Accuracy: '} value={last_location?.accuracy} />
          <RenderField
            title={'Altitude: '}
            value={`${last_location?.altitude}`}
          />
          <RenderField
            title={'Altitude accuracy: '}
            value={`${last_location?.altitudeAccuracy}`}
          />
          <RenderField
            title={'Heading: '}
            value={`${last_location?.heading}`}
          />
          <RenderField title={'Speed: '} value={`${last_location?.speed} `} />

          <RenderField
            valueTestId={'latitude-value'}
            title={'Latitude: '}
            value={`${last_location?.latitude} `}
            valueExtraStyle={getCoordsColor() as StyleProp<TextStyle>}
          />
          <RenderField
            valueTestId={'longitude-value'}
            title={'Longitude: '}
            value={`${last_location?.longitude} `}
            valueExtraStyle={getCoordsColor() as StyleProp<TextStyle>}
          />

          <View style={refreshButtonContainer}>
            <Button
              testID={'refreshLocationButton'}
              label="Refresh location"
              disabled={refreshingLoading === true}
              onPress={onRefreshLocationPress}
              style={changeStatusButtonStyle}
              iconOnRight
              iconSource={makeActiveLoadingIndicator}
              bg-secondaryColor
              square
            />
          </View>
        </Card>
      ) : (
        <Text style={emptyContentText}>
          {'No location details were registered'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 0,
    marginTop: 2,
    padding: 0,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  clientText: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    flex: 1,
    textAlign: 'center',
  },
  refreshButtonLoadingStyle: {marginLeft: 10},

  cardStyle: {
    flex: 1,
    marginTop: 5,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    minHeight: 300,
    overflow: 'hidden',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },

  emptyContentText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
  refreshButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 5,
  },
  changeStatusButtonStyle: {
    height: 50,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 10,
  },
});
