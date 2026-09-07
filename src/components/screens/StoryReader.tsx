import { router } from 'expo-router';
import { BookmarkPlus, ChevronLeft, ChevronRight, Heart, Share2, ShoppingCart, X } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { readerPages, Story } from '@/data/stories';

export function StoryReader({ story }: { story: Story }) {
  const { likedStories, toggleLike, favoritedStories, toggleFavorite } = useApp();
  const [currentPage, setCurrentPage] = useState(0);

  const isLiked = likedStories.has(story.id);
  const isFavorited = favoritedStories.has(story.id);
  const pages = readerPages(story);
  const totalPages = pages.length;

  const handlePrevPage = () => currentPage > 0 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => (currentPage < totalPages - 1 ? setCurrentPage(currentPage + 1) : undefined);

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 py-4 border-b border-gray-200 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <X size={24} color="#000000" />
        </TouchableOpacity>
        <View className="flex-1 px-4">
          <Text className="text-sm font-semibold" numberOfLines={1}>
            {story.title}
          </Text>
          <Text className="text-xs text-gray-600">by {story.author}</Text>
        </View>
        <View className="p-2 w-6" />
      </View>

      <ScrollView className="flex-1">
        {currentPage === 0 ? (
          <View className="p-6">
            <View style={{ backgroundColor: story.bgColor }} className="rounded-3xl p-12 mb-6 items-center justify-center">
              <Text style={{ fontSize: 80 }} className="mb-4">
                {story.cover}
              </Text>
              <View className="bg-white/90 rounded-2xl p-4 items-center w-full">
                <Text className="text-2xl mb-2 font-bold text-center">{story.title}</Text>
                <Text className="text-sm text-gray-600 mb-1">Written by</Text>
                <Text className="text-lg mb-1 font-semibold">{story.author}</Text>
                <Text className="text-sm text-gray-600">{story.school}</Text>
              </View>
            </View>

            <View className="bg-gray-50 rounded-2xl p-4 mb-4">
              <View className="flex-row justify-around">
                {[
                  { label: 'Reads', value: story.reads },
                  { label: 'Likes', value: story.likes },
                  { label: 'Rating', value: story.rating },
                ].map((stat) => (
                  <View key={stat.label} className="items-center">
                    <Text className="text-2xl mb-1">{stat.value}</Text>
                    <Text className="text-xs text-gray-600">{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="mb-4 self-start rounded-full px-3 py-1" style={{ backgroundColor: Brand.blueLightFill }}>
              <Text className="text-xs" style={{ color: Brand.blue }}>
                {story.category}
              </Text>
            </View>

            <TouchableOpacity onPress={handleNextPage} style={{ backgroundColor: Brand.blue }} className="rounded-2xl py-4 items-center">
              <Text className="text-white text-lg font-semibold">Start Reading</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="p-6">
            <Text className="text-lg" style={{ lineHeight: 28 }}>
              {pages[currentPage]}
            </Text>
          </View>
        )}
      </ScrollView>

      <View className="border-t border-gray-200 p-4">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={handlePrevPage}
            disabled={currentPage === 0}
            style={{ backgroundColor: currentPage === 0 ? '#F3F4F6' : Brand.blue }}
            className="flex-row items-center gap-2 px-4 py-2 rounded-xl"
          >
            <ChevronLeft size={20} color={currentPage === 0 ? '#9CA3AF' : '#FFFFFF'} />
            <Text style={{ color: currentPage === 0 ? '#9CA3AF' : '#FFFFFF' }} className="font-semibold">
              Previous
            </Text>
          </TouchableOpacity>

          <Text className="text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </Text>

          <TouchableOpacity
            onPress={handleNextPage}
            disabled={currentPage === totalPages - 1}
            style={{ backgroundColor: currentPage === totalPages - 1 ? '#F3F4F6' : Brand.blue }}
            className="flex-row items-center gap-2 px-4 py-2 rounded-xl"
          >
            <Text style={{ color: currentPage === totalPages - 1 ? '#9CA3AF' : '#FFFFFF' }} className="font-semibold">
              Next
            </Text>
            <ChevronRight size={20} color={currentPage === totalPages - 1 ? '#9CA3AF' : '#FFFFFF'} />
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => toggleLike(story.id)}
            style={{ backgroundColor: isLiked ? '#FCE7F3' : '#F3F4F6' }}
            className="flex-1 items-center gap-1 p-3 rounded-xl"
          >
            <Heart size={20} color={Brand.rose} fill={isLiked ? Brand.rose : 'none'} />
            <Text className="text-xs">Like</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleFavorite(story.id)}
            style={{ backgroundColor: isFavorited ? '#FFF7ED' : '#F3F4F6' }}
            className="flex-1 items-center gap-1 p-3 rounded-xl"
          >
            <BookmarkPlus size={20} color={Brand.orange} fill={isFavorited ? Brand.orange : 'none'} />
            <Text className="text-xs">Save</Text>
          </TouchableOpacity>

          <View className="flex-1 items-center gap-1 p-3 rounded-xl bg-gray-100">
            <Share2 size={20} color={Brand.cyan} />
            <Text className="text-xs">Share</Text>
          </View>

          <View className="flex-1 items-center gap-1 p-3 rounded-xl bg-gray-100">
            <ShoppingCart size={20} color={Brand.blue} />
            <Text className="text-xs">Order</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
