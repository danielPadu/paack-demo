import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import {useDispatch, useSelector} from 'react-redux';
//import {connect} from 'react-redux';
import {loadingModalClose} from '../../../appStore/actions/modalActions';
import {screenHeight, screenWidth} from '../../utils';
import { useIsFocused } from '@react-navigation/native';

const LoadingModal = () => {
  const {
    loadingModal: {isOpen},
  } = useSelector((state: any) => state.modalReducer);
  const dispatch = useDispatch();
  const {modalStyle, containerStyle} = styles;

  const modalClosing = () => {
    if (isOpen) {
      dispatch(loadingModalClose());
    }
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={400}
      propagateSwipe={true}
      //transparent={true}
      isVisible={isOpen}
      backdropColor={'#75747452'}
      onBackdropPress={() => modalClosing()}
      style={modalStyle}
      deviceWidth={screenWidth}
      deviceHeight={screenHeight}>
      <View style={containerStyle}>
        <Progress.Circle
          size={90}
          indeterminate={true}
          borderWidth={10}
          borderColor={'gray'}
          //endAngle={0.75}
          thickness={5}
          strokeCap={'round'}
          fill={'transparent'}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    margin: 0,
    marginBottom: 0,
  },
  containerStyle: {
    zIndex: 99999,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    opacity: 0.8,
  },
});
/* const mapStateToProps = store => {
  const {theme} = store.appReducer;
  const {
    loadingModal: {isOpen, options},
  } = store.modalReducer;
  return {isOpen, options, theme};
};
const mapDispatchToProps = dispatch => {
  return {
    modalLoadingClose: () => dispatch(modalLoadingClose()),
  };
}; */
export default /* connect(mapStateToProps, mapDispatchToProps)( */ LoadingModal;
