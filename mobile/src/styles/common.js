import EStyleSheet from 'react-native-extended-stylesheet';

const common = EStyleSheet.create({
  alignCenterCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonM: {
    width: 200,
    height: '$buttonHeightM',
  },
  buttonFull: {
    width: '100%',
    height: '$buttonHeightM',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  rowM: {
    marginBottom: 25,
  },
});

export default common;
