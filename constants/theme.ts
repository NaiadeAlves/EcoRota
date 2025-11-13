/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#2D6F3F';
const tintColorDark = '#1d4327ff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F7F4EF',
    backgroundCard: '#F7F4EF',
    tint: tintColorLight,
    icon: '#ECEDEE',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    button: '#2D6F3F',
    border: '#2D6F3F',
    border2: '#2D6F3F'
  },
  dark: {
    text: '#ECEDEE',
    background: '#1c1e1fff',
    backgroundCard: '#242627ff',
    tint: tintColorDark,
    icon: '#ECEDEE',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    button: '#1d4327ff',
    border: '#1d4327ff',
    border2: '#1d4327ff'
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
