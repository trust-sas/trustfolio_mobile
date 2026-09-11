import { router } from 'expo-router';
import { Heart, Search, Star } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { storyHref, stories, storyCategories } from '@/data/stories';
import { useApp } from '@/context/AppContext';

export function Stories() {
  const { likedStories, toggleLike } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filtered = useMemo(() => {
    return stories.filter((story) => {
      const matchesCategory =
        activeCategory === 'Tous' || story.category === activeCategory;
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
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* ── Header plat ── */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderBottomWidth: 1,
            borderBottomColor: '#F0F0F0',
            paddingHorizontal: 20,
            paddingTop: 56,
            paddingBottom: 16,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 14 }}>
            Bibliothèque de contes
          </Text>

          {/* Barre de recherche */}
          <View
            style={{
              backgroundColor: '#F3F4F6',
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 10,
              gap: 10,
            }}
          >
            <Search size={18} color="#9CA3AF" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Rechercher contes, auteurs..."
              placeholderTextColor="#9CA3AF"
              style={{ flex: 1, fontSize: 14, color: '#111827' }}
            />
          </View>
        </View>

        {/* ── Pastilles catégories ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: 14 }}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {storyCategories.map((category) => {
            const active = activeCategory === category.name;
            return (
              <TouchableOpacity
                key={category.name}
                onPress={() => setActiveCategory(category.name)}
                style={{
                  backgroundColor: active ? Brand.blue : '#F3F4F6',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: active ? '#FFFFFF' : '#374151',
                    fontSize: 13,
                    fontWeight: '600',
                  }}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Grille de contes ── */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
            {filtered.map((story) => {
              const isLiked = likedStories.has(story.id);
              return (
                <View
                  key={story.id}
                  style={{
                    width: '47%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 14,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                  }}
                >
                  {/* Couverture */}
                  <View
                    style={{
                      height: 140,
                      backgroundColor: story.bgColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 52 }}>{story.cover}</Text>
                    {/* Badge note */}
                    <View
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255,255,255,0.92)',
                        borderRadius: 20,
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 3,
                      }}
                    >
                      <Star size={11} color="#F59E0B" fill="#F59E0B" />
                      <Text style={{ fontSize: 11, fontWeight: '600', color: '#111827' }}>
                        {story.rating}
                      </Text>
                    </View>
                    {/* Bouton cœur */}
                    <TouchableOpacity
                      onPress={() => toggleLike(story.id)}
                      style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(255,255,255,0.92)',
                        borderRadius: 20,
                        padding: 5,
                      }}
                    >
                      <Heart
                        size={14}
                        color={Brand.rose}
                        fill={isLiked ? Brand.rose : 'none'}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Infos */}
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{ fontSize: 13, fontWeight: '600', color: '#111827', marginBottom: 2 }}
                      numberOfLines={1}
                    >
                      {story.title}
                    </Text>
                    <Text style={{ fontSize: 11, color: '#6B7280', marginBottom: 8 }}>
                      par {story.author}
                    </Text>

                    <TouchableOpacity
                      onPress={() => router.push(storyHref(story.id))}
                      style={{
                        backgroundColor: Brand.blue,
                        borderRadius: 8,
                        paddingVertical: 8,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>
                        Lire
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>

          {filtered.length === 0 && (
            <View style={{ alignItems: 'center', paddingVertical: 48 }}>
              <Text style={{ fontSize: 40, marginBottom: 12 }}>🔍</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 6 }}>
                Aucun conte trouvé
              </Text>
              <Text style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center' }}>
                Essaie une autre catégorie ou un autre mot-clé
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
