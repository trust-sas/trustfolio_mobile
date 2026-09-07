import { Image } from 'expo-image';
import { View, Text } from 'react-native';
import Svg, { Circle, Pattern, Rect } from 'react-native-svg';

import { Brand } from '@/constants/theme';

const logo = require('@/assets/images/trustfoliokids-logo.png');

export function SplashScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center p-8">
      <View className="mb-8">
        <Image source={logo} style={{ width: 320, height: 160 }} contentFit="contain" />
      </View>

      <Text className="text-xl text-gray-700 text-center mb-12 font-semibold">
        Read. Play. Create. Become an Author.
      </Text>

      <View className="flex-row gap-2">
        {[Brand.blue, Brand.orange, Brand.rose].map((color, i) => (
          <View
            key={i}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </View>

      <View className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
        <Svg width="100%" height="100%" viewBox="0 0 400 100">
          <Pattern id="african-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <Circle cx="20" cy="20" r="3" fill={Brand.cyan} />
            <Circle cx="10" cy="10" r="2" fill={Brand.orange} />
            <Circle cx="30" cy="30" r="2" fill={Brand.rose} />
          </Pattern>
          <Rect width="400" height="100" fill="url(#african-pattern)" />
        </Svg>
      </View>
    </View>
  );
}
