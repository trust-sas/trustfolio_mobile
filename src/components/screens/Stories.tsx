import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { BookOpen, Filter, Heart, Search, Star } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { storyHref, stories, storyCategories } from '@/data/stories';
import { useApp } from '@/context/AppContext';

const librarySlice = stories.slice(6);

export function Stories() {
  const { likedStories, toggleLike } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return librarySlice.filter((story) => {
      const matchesCategory = activeCategory === 'All' || story.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        story.title.toLowerCase().includes(q) ||
        story.author.toLowerCase().includes(q) ||
        story.school.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
        <LinearGradient
          colors={[Brand.rose, Brand.orange]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 24,
            marginBottom: 16,
          }}
        >
          <Text className="text-white text-2xl mb-4 font-bold">Story Library</Text>

          <View className="bg-white rounded-2xl p-3 flex-row items-center gap-3 mb-3">
            <Search size={20} color="#9CA3AF" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search stories, authors, schools..."
              className="flex-1 text-sm"
            />
          </View>

          <TouchableOpacity
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            className="rounded-xl px-4 py-2 flex-row items-center gap-2 self-start"
          >
            <Filter size={16} color="#ffffff" />
            <Text className="text-white text-sm font-semibold">Filters</Text>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-4">
          <View className="flex-row gap-2">
            {storyCategories.map((category) => {
              const active = activeCategory === category.name;
              return (
                <TouchableOpacity
                  key={category.name}
                  onPress={() => setActiveCategory(category.name)}
                  style={{ backgroundColor: active ? Brand.blue : '#F3F4F6' }}
                  className="px-4 py-2 rounded-full"
                >
                  <Text style={{ color: active ? '#FFFFFF' : '#374151' }} className="text-sm font-semibold">
                    {category.name} ({category.count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View className="px-4">
          <View className="flex-row flex-wrap gap-4">
            {filtered.map((story) => {
              const isLiked = likedStories.has(story.id);
              return (
                <View key={story.id} style={{ width: '47%' }} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                  <View style={{ backgroundColor: story.bgColor }} className="h-40 items-center justify-center">
                    <Text style={{ fontSize: 56 }} className="mb-2">
                      {story.cover}
                    </Text>
                    <View className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex-row items-center gap-1">
                      <Star size={12} color={Brand.yellow} fill={Brand.yellow} />
                      <Text className="text-xs font-semibold">{story.rating}</Text>
                    </View>
                  </View>

                  <View className="p-3">
                    <Text className="text-sm mb-1 font-semibold" numberOfLines={1}>
                      {story.title}
                    </Text>
                    <Text className="text-xs text-gray-600 mb-0.5">by {story.author}</Text>
                    <Text className="text-xs text-gray-500 mb-2">{story.school}</Text>

                    <View className="flex-row items-center gap-3 mb-3">
                      <View className="flex-row items-center gap-1">
                        <BookOpen size={12} color="#4B5563" />
                        <Text className="text-xs text-gray-600">{story.reads}</Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <Heart size={12} color="#4B5563" />
                        <Text className="text-xs text-gray-600">{story.likes}</Text>
                      </View>
                    </View>

                    <View className="mb-3 self-start rounded-full px-2 py-1" style={{ backgroundColor: Brand.blueLightFill }}>
                      <Text className="text-xs" style={{ color: Brand.blue }}>
                        {story.category}
                      </Text>
                    </View>

                    <View className="flex-row gap-2">
                      <TouchableOpacity
                        onPress={() => router.push(storyHref(story.id))}
                        style={{ backgroundColor: Brand.blue }}
                        className="flex-1 rounded-xl py-2 items-center"
                      >
                        <Text className="text-white text-xs font-semibold">Read</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => toggleLike(story.id)} className="bg-gray-100 p-2 rounded-xl">
                        <Heart size={16} color="#374151" fill={isLiked ? '#374151' : 'none'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <TouchableOpacity className="w-full mt-6 bg-white border-2 border-gray-200 rounded-2xl py-3 items-center">
            <Text className="text-sm text-gray-700 font-semibold">Load More Stories</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.push('/write')}
        style={{ backgroundColor: Brand.orange, position: 'absolute', bottom: 96, right: 16 }}
        className="rounded-full px-4 py-4 flex-row items-center gap-2 shadow-lg"
      >
        <Text style={{ fontSize: 22 }}>✍️</Text>
        <Text className="text-white text-sm font-semibold pr-1">Write Story</Text>
      </TouchableOpacity>
    </View>
  );
}
