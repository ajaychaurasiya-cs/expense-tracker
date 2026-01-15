import { Platform, useColorScheme } from 'react-native';
import type { ColorSchemeName } from "react-native";
import { useCategory } from '../context/CategoryContext';
import React, { useCallback, useState } from 'react';

// const [theme, setTheme] = useState<"light" | "dark" | null>(null);


export const getColors = (scheme: ColorSchemeName) => {
  const isDark = scheme === "dark";
  return {
    text: isDark ? "#ffffff" : "#000000",
    background: isDark ? "#121212" : "#ffffffff",
    tint: isDark ? "#ffffff" : "#0a7ea4",
    icon: isDark ? "#ffffff" : "#000000",
    card: isDark ? "#1e3a5f" : "#3791df",
    container: isDark ? "#0b1c2d" : "#154163",
  };
};


// export const Colors = {

  
//     text: isDark ? "#ffffff" : "#000000",
//     background: isDark ? "#121212" : "#ffffffff",
//     tint: isDark ? "#ffffff" : "#0a7ea4",
//     icon: isDark ? "#ffffff" : "#000000",
//     card: isDark ? "#1e3a5f" : "#3791df",
//     container: isDark ? "#0b1c2d" : "#154163",
// };



export const Colors = {
 
  // text: text,
  // background: background,
  // tint: tint,
  // icon: icon,
  // card: card,
  // container: container,
  text: '#ffffffff',
  background: '#ffffffff',
  icon: '#ffffffff',
  card: "#3791df",
  container: "#154163"
  
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
