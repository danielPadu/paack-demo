import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {Button, Card} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {first} from 'rxjs/operators';
import {setAppActiveDeliveryID} from '../appStore/actions/appActions';
import useLocation from '../hooks/useLocation';
import type {DeliveryDetailsScreenProps} from '../navigation/RootNavigation';
import {
  getDeliveryDetails,
  updateDeliveryState,
} from '../services/rest/deliveryService';
import {LocationCard} from '../UI/components';
import {activityIndicator} from '../UI/components/buttonsActivityIndicator';
import {RenderField, RenderFieldTypes} from '../UI/components/RenderField';
import {DeliveryListItemTypes} from './types';

const DeliveryDetailsScreen = ({route}: DeliveryDetailsScreenProps) => {
  const {deliveryId} = route.params;
  const {active_delivery_id} = useSelector((state: any) => state.appReducer);
  const {location} = useLocation();
  const dispatch = useDispatch();
  const {
    wrapperStyle,
    containerStyle,
    pageTitleContainer,
    pageTitleStyle,
    showLocationButtonStyle,
    activeDeliveryText,
    cardContainer,
    clientContainer,
    makeActiveButtonStyle,
    makeActiveButtonLoadingStyle,
    clientText,
    cardStyle,
    emptyListText,
    changeStatusContainer,
    changeStatusButtonStyle,
    changeStatusButtonLabelStyle,
  } = styles;
  const [deliveryDetails, setDeliveryDetails] =
    useState<DeliveryListItemTypes | null>(null);
  const [customerInfo, setCustomerInfo] = useState<
    {title?: string; value?: string}[]
  >([]);
  const [apiRequest, setApiRequest] = useState(false);
  const settingApiReq = (val: boolean) => setApiRequest(val);
  const [showLocation, setShowLocation] = useState(false);
  const [makeActiveLoading, setMakeActiveLoading] = useState(false);
  useEffect(() => {
    if (deliveryId) {
      settingApiReq(true);
      getDeliveryDetails(deliveryId)
        .pipe(first())
        .subscribe({
          next: (data: any) => {
            setDeliveryDetails(data);
            const arrayData: {title: string; value: string}[] = [];
            Object.entries(data.customer).forEach(([key]) => {
              arrayData.push({
                title: `${key?.charAt(0)?.toUpperCase() + key?.slice(1)} : `,
                value: data.customer[key],
              });
            });
            setCustomerInfo(arrayData);
            settingApiReq(false);
          },
          error: () => {
            settingApiReq(false);
          },
        });
    }
  }, [deliveryId]);
  const getStatusColor = (value?: 'idle' | 'delivered' | 'undelivered') => ({
    color:
      value === 'delivered' ? 'green' : value === 'idle' ? 'orange' : 'red',
    fontSize: 12,
    fontWeight: '900',
  });

  const makeActiveLoadingIndicator = useCallback(() => {
    return makeActiveLoading ? (
      <ActivityIndicator
        style={makeActiveButtonLoadingStyle}
        size="small"
        color="#0000ff"
      />
    ) : null;
  }, [makeActiveButtonLoadingStyle, makeActiveLoading]);

  const onMakeActivePress = useCallback(() => {
    setMakeActiveLoading(true);
    if (deliveryDetails?.id) {
      dispatch(setAppActiveDeliveryID(deliveryDetails.id));
    }
    setMakeActiveLoading(false);
  }, [dispatch, deliveryDetails?.id]);

  const onChangeStatusPress = useCallback(
    (status: 'delivered' | 'undelivered') => {
      if (deliveryDetails?.id) {
        settingApiReq(true);
        updateDeliveryState(deliveryDetails.id, {
          delivery: {
            status: status,
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
        })
          .pipe(first())
          .subscribe({
            next: (data: any) => {
              setDeliveryDetails(data);
              dispatch(setAppActiveDeliveryID(''));
              settingApiReq(false);
            },
            error: () => {
              settingApiReq(false);
            },
          });
      }
    },
    [deliveryDetails?.id, dispatch, location],
  );
  const noDeliverYDetails = useCallback(() => {
    return !apiRequest ? (
      <Text style={emptyListText}>
        {'No delivery details received at the moment'}
      </Text>
    ) : null;
  }, [apiRequest, emptyListText]);
  return (
    <SafeAreaView style={wrapperStyle}>
      <View style={containerStyle}>
        <View style={pageTitleContainer}>
          <Text style={pageTitleStyle}>{'Delivery Details Screen'}</Text>
        </View>
        <Button
          testID={'showLocationButton'}
          label={`${showLocation ? 'Hide' : 'Show'} device location`}
          onPress={() => setShowLocation(c => !c)}
          style={showLocationButtonStyle}
          bg-secondaryColor
          square
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={false}>
          <View style={cardContainer}>
            {activityIndicator(apiRequest)}
            {deliveryDetails ? (
              <Card
                row={false}
                style={cardStyle}
                enableShadow={true}
                useNative
                activeOpacity={1}>
                <View style={clientContainer}>
                  <Text
                    style={clientText}>{`${deliveryDetails?.client} `}</Text>
                  {deliveryDetails?.id !== active_delivery_id &&
                    deliveryDetails?.delivery?.status !== 'delivered' && (
                      <Button
                        label="Make active"
                        disabled={active_delivery_id?.length > 0}
                        onPress={onMakeActivePress}
                        style={makeActiveButtonStyle}
                        iconOnRight
                        iconSource={makeActiveLoadingIndicator}
                        bg-primaryColor
                        square
                      />
                    )}
                  {deliveryDetails?.id === active_delivery_id && (
                    <Text style={activeDeliveryText}>{'Active delivery'}</Text>
                  )}
                </View>
                {customerInfo?.map((i, idx) => {
                  return <RenderField key={idx} {...(i as RenderFieldTypes)} />;
                })}
                <RenderField
                  title={'Status: '}
                  value={`${deliveryDetails?.delivery?.status} `}
                  valueExtraStyle={
                    getStatusColor(
                      deliveryDetails?.delivery?.status,
                    ) as StyleProp<TextStyle>
                  }
                />
                {deliveryDetails?.id === active_delivery_id && (
                  <View style={changeStatusContainer}>
                    <Button
                      label="Mark as delivered"
                      disabled={
                        deliveryDetails?.delivery?.status === 'delivered'
                      }
                      onPress={() => onChangeStatusPress('delivered')}
                      style={changeStatusButtonStyle}
                      iconOnRight
                      iconSource={makeActiveLoadingIndicator}
                      bg-successColor
                      square
                    />
                    <Button
                      label="Make as undelivered"
                      labelStyle={changeStatusButtonLabelStyle}
                      disabled={
                        deliveryDetails?.delivery?.status === 'delivered'
                      }
                      onPress={() => onChangeStatusPress('undelivered')}
                      style={changeStatusButtonStyle}
                      iconOnRight
                      iconSource={makeActiveLoadingIndicator}
                      bg-errorColor
                      square
                    />
                  </View>
                )}
              </Card>
            ) : (
              noDeliverYDetails()
            )}
          </View>
          {showLocation && <LocationCard />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    backgroundColor: 'white',
    color: 'black',
  },

  containerStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: isIOS ? 10 : 5,
  },
  pageTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitleStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: 'navy',
    paddingVertical: 0,
    marginVertical: 0,
  },
  showLocationButtonStyle: {
    height: 40,
    width: 200,

    marginVertical: 10,
    alignSelf: 'center',
  },
  cardContainer: {
    margin: 0,
    marginTop: 2,
    padding: 0,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  clientContainer: {
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
    color: 'black',
    fontWeight: '600',
  },
  makeActiveButtonStyle: {
    height: 30,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  makeActiveButtonLoadingStyle: {marginLeft: 10},
  activeDeliveryText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '900',
    color: 'green',
  },
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

  emptyListText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
  changeStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  changeStatusButtonStyle: {
    height: 50,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '50%',
  },
  changeStatusButtonLabelStyle: {
    fontSize: 10,
    fontWeight: '900',
  },
});
export default DeliveryDetailsScreen;
