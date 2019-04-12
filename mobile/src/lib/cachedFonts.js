import { Font } from 'expo';

const cachedFonts = fonts =>
  fonts.map(font => Font.loadAsync(font));

export const fontAssets = cachedFonts([
  { robotoBlack: require('../../assets/fonts/Roboto-Black.ttf') },
  { robotoBold: require('../../assets/fonts/Roboto-Bold.ttf') },
  { robotoLight: require('../../assets/fonts/Roboto-Light.ttf') },
  { robotoMedium: require('../../assets/fonts/Roboto-Medium.ttf') },
  { robotoRegular: require('../../assets/fonts/Roboto-Regular.ttf') },
  { robotoThin: require('../../assets/fonts/Roboto-Thin.ttf') },
]);
