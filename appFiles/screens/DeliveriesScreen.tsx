import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Card} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
import {first} from 'rxjs/operators';
import {
  loadingModalClose,
  loadingModalOpen,
} from '../appStore/actions/modalActions';
import {navigate} from '../navigation/RootNavigation';
import {getDeliveriesList} from '../services/rest/deliveryService';
import {activityIndicator} from '../UI/components/buttonsActivityIndicator';
import {isIOS, log} from '../UI/utils';
import {DeliveryListItemTypes} from './types';

const DeliveriesScreen = () => {
  const isFocused = useIsFocused();
  const {
    wrapperStyle,
    containerStyle,
    pageTitleContainer,
    pageTitleStyle,
    listContainer,
    itemContainerPressable,
    indexStyle,
    deliveryListItem,
    clientContainer,
    statusContainer,
    emptyListText,
    statusTextStyle,
  } = styles;
  const [deliveriesList, setDeliveriesList] = useState<
    DeliveryListItemTypes[] | null
  >(null);
  const dispatch = useDispatch();
  const [apiRequest, setApiRequest] = useState(false);
  useEffect(() => {
    if (isFocused) {
      setApiRequest(true);
      getDeliveriesList()
        .pipe(first())
        .subscribe({
          next: (data: unknown) => {
            if (Array.isArray(data)) {
              const trimmedData = data?.map((i: DeliveryListItemTypes) => ({
                id: i.id,
                client: i.client,
                delivery: i.delivery,
              })) as DeliveryListItemTypes[];
              setDeliveriesList(trimmedData);
            }
            setApiRequest(false);
          },
          error: () => {
            setApiRequest(false);
          },
        });
    }
  }, [isFocused]);
  useEffect(() => {
    apiRequest ? dispatch(loadingModalOpen()) : dispatch(loadingModalClose());
  }, [apiRequest, dispatch]);
  const onItemPressed = (item: DeliveryListItemTypes) => {
    navigate('DeliveryDetailsScreen', {deliveryId: item.id});
  };
  const getStatusColor = (value?: 'idle' | 'delivered' | 'undelivered') => ({
    color:
      value === 'delivered' ? 'green' : value === 'idle' ? 'orange' : 'red',
  });
  const noDeliveries = useCallback(() => {
    return !apiRequest ? (
      <Text style={emptyListText}>{'No deliveries at the moment'}</Text>
    ) : null;
  }, [apiRequest, emptyListText]);
  return (
    <SafeAreaView style={wrapperStyle}>
      <View style={containerStyle}>
        <View style={pageTitleContainer}>
          <Text style={pageTitleStyle}>{'Deliveries List'}</Text>
          {activityIndicator(apiRequest)}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={false}>
          <View style={listContainer}>
            {deliveriesList && deliveriesList?.length > 0
              ? deliveriesList?.map((i: DeliveryListItemTypes, idx: number) => {
                  return (
                    <Pressable
                      key={idx}
                      style={itemContainerPressable}
                      onPress={() => onItemPressed(i)}>
                      <Card
                        row
                        style={[
                          deliveryListItem,
                          // eslint-disable-next-line react-native/no-inline-styles
                          isIOS && {backgroundColor: '#0000'},
                        ]}
                        enableShadow={true}
                        useNative
                        activeOpacity={1}>
                        <Text style={indexStyle}>{`${i.id}. `}</Text>
                        <View style={clientContainer}>
                          <Text>{i.client}</Text>
                        </View>
                        <View style={statusContainer}>
                          <Text
                            style={[
                              statusTextStyle,
                              {
                                ...getStatusColor(i?.delivery?.status),
                              },
                            ]}>
                            {i?.delivery?.status}
                          </Text>
                        </View>
                      </Card>
                    </Pressable>
                  );
                })
              : noDeliveries()}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  pageTitleStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: 'navy',
  },
  listContainer: {
    margin: 0,
    marginTop: 2,
    padding: 0,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainerPressable: {
    width: '100%',
    height: 50,
    padding: 5,
  },
  deliveryListItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',

    overflow: 'hidden',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 13,
  },
  indexStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  clientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'orange',
    width: 80,
    marginRight: 10,
  },
  statusTextStyle: {
    fontSize: 12,
    fontWeight: '900',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
});
export default DeliveriesScreen;
