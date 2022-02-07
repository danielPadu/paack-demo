import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {Card, Colors} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {infoModalClose} from '../../../appStore/actions/modalActions';
import {screenHeight, screenWidth} from '../../utils';

const InfoModal = () => {
  const {
    infoModal: {isOpen, options},
  } = useSelector((state: any) => state.modalReducer);
  const dispatch = useDispatch();
  const {title, description} = options;
  const {modalStyle, cardStyle, shadow, titleStyle, descriptionStyle} = styles;
  const modalClosing = () => {
    if (isOpen) {
      dispatch(infoModalClose());
    }
  };

  return isOpen ? (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={400}
      propagateSwipe={true}
      isVisible={isOpen}
      backdropColor={Colors.primaryBackdropColor}
      onBackdropPress={() => modalClosing()}
      style={modalStyle}
      deviceWidth={screenWidth}
      deviceHeight={screenHeight}>
      <Card
        row={false}
        style={[cardStyle, shadow]}
        enableShadow={true}
        useNative
        activeOpacity={1}>
        <Text style={titleStyle}>{title}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={descriptionStyle}>{description}</Text>
        </ScrollView>
      </Card>
    </Modal>
  ) : null;
};
const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    margin: 0,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStyle: {
    flex: 0,
    flexShrink: 1,
    marginHorizontal: '15%',
    marginVertical: '10%',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    height: 200,
  },
  shadow: {
    borderRadius: 20,
    shadowColor: Colors.primaryBackdropColor,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 3,
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 24,
    color: Colors.blue1,
    paddingVertical: 20,
  },
  descriptionStyle: {
    fontWeight: '400',
    fontSize: 16,
    color: Colors.blue1,
    paddingVertical: 20,
    textAlign: 'justify',
  },
});
export default InfoModal;
