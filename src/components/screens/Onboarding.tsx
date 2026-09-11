import { ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Brand } from '@/constants/theme';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    title: 'Discover Stories Created by Children',
    description: 'Read amazing stories written by children just like you from schools across Africa',
    emoji: '📚',
    bgColor: Brand.cyan,
  },
  {
    title: 'Learn Through Educational Games',
    description: 'Play fun games that teach you about words, reading, culture, and money',
    emoji: '🎮',
    bgColor: Brand.orange,
  },
  {
    title: 'Become a Published Author',
    description: 'Write your own stories and share them with children around the world',
    emoji: '✍️',
    bgColor: Brand.rose,
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 flex-row justify-end">
        <TouchableOpacity onPress={onComplete} className="px-4 py-2">
          <Text className="text-gray-500">Skip</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center px-8">
        <View
          className="w-48 h-48 rounded-full items-center justify-center mb-8"
          style={{
            backgroundColor: slide.bgColor,
            boxShadow: '0px 10px 20px rgba(0,0,0,0.25)',
            elevation: 12,
          }}
        >
          <Text style={{ fontSize: 80 }}>{slide.emoji}</Text>
        </View>

        <Text className="text-2xl text-center mb-4 px-4 font-bold">{slide.title}</Text>
        <Text className="text-gray-600 text-center mb-12">{slide.description}</Text>
      </View>

      <View className="p-8">
        <View className="flex-row justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <View
              key={index}
              className="h-2 rounded-full"
              style={{
                width: index === currentSlide ? 32 : 8,
                backgroundColor: index === currentSlide ? Brand.blue : '#D1D5DB',
              }}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          className="w-full rounded-2xl py-4 flex-row items-center justify-center gap-2"
          style={{ backgroundColor: Brand.rose }}
        >
          <Text className="text-lg text-white font-semibold">
            {currentSlide === slides.length - 1 ? 'Start My Adventure' : 'Next'}
          </Text>
          <ChevronRight size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
