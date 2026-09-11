import { Image } from 'expo-image';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Pattern, Rect } from 'react-native-svg';

import { Brand } from '@/constants/theme';

const logo = require('@/assets/images/trustfoliokids-logo.png');
// Ratio natif du PNG source (1020x428) pour préserver l'aspect au lieu de le figer.
const LOGO_WIDTH = 320;
const LOGO_HEIGHT = LOGO_WIDTH * (428 / 1020);

function Dot({ color, delay }: { color: string; delay: number }) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, [delay, opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      className="w-3 h-3 rounded-full"
      style={[{ backgroundColor: color }, style]}
    />
  );
}

export function SplashScreen() {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-14, { duration: 500, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: 500, easing: Easing.in(Easing.cubic) })
      ),
      -1,
      false
    );
  }, [translateY]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View className="flex-1 bg-white items-center justify-center p-8">
      <Animated.View className="mb-8" style={logoStyle}>
        <Image source={logo} style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }} contentFit="contain" />
      </Animated.View>

      <Text className="text-xl text-gray-700 text-center mb-12 font-semibold">
        Read. Play. Create. Become an Author.
      </Text>

      <View className="flex-row gap-2">
        {[Brand.blue, Brand.orange, Brand.rose].map((color, i) => (
          <Dot key={i} color={color} delay={i * 200} />
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
