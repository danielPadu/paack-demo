/* eslint-disable react-native/no-inline-styles */
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Card} from 'react-native-ui-lib';
import {first} from 'rxjs/operators';
import {getDeliveriesList} from '../services/rest/deliveryService';
import {isIOS, log} from '../UI/utils';
import {DeliveryScreenProps, ListItem} from './types';

const DeliveriesScreen = ({navigation}: DeliveryScreenProps) => {
  const isFocused = useIsFocused();
  const {
    wrapperStyle,
    containerStyle,
    pageTitleStyle,
    listContainer,
    itemContainerPressable,
    indexStyle,
    listItem,
    clientContainer,
    statusContainer,
    emptyListText,
    statusTextStyle,
  } = styles;
  const [deliveriesList, setDeliveriesList] = useState<ListItem[] | null>(null);
  useEffect(() => {
    if (isFocused) {
      getDeliveriesList()
        .pipe(first())
        .subscribe({
          next: (data: any) => {
            const trimmedData = data?.map((i: ListItem) => ({
              id: i.id,
              client: i.client,
              delivery: i.delivery,
            })) as ListItem[];
            setDeliveriesList(trimmedData);
          },
          error: error => {
            log({error: error});
          },
        });
    }
  }, [isFocused]);
  const onItemPressed = (item: ListItem) => {
    log({pressed_item: item});
    navigation.push('DeliveryDetailsScreen', {
      deliveryId: item.id,
    });
  };
  const getStatusColor = (value?: 'idle' | 'delivered' | 'undelivered') => ({
    color:
      value === 'delivered' ? 'green' : value === 'idle' ? 'orange' : 'red',
  });
  return (
    <SafeAreaView style={wrapperStyle}>
      <View style={containerStyle}>
        <Text style={pageTitleStyle}>{'Deliveries List'}</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={false}>
          <View style={listContainer}>
            {deliveriesList && deliveriesList?.length > 0 ? (
              deliveriesList?.map((i: ListItem, idx: number) => {
                return (
                  <Pressable
                    key={idx}
                    style={itemContainerPressable}
                    onPress={() => onItemPressed(i)}>
                    <Card
                      row
                      style={[listItem, isIOS && {backgroundColor: '#0000'}]}
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
            ) : (
              <Text style={emptyListText}>{'No deliveries at the moment'}</Text>
            )}
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
  listItem: {
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
