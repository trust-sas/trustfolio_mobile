import { BookOpen, Heart, X } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { storyFullContent, Story } from '@/data/stories';
import { goBack } from '@/utils/navigation';

export function StoryReader({ story }: { story: Story }) {
  const { likedStories, toggleLike } = useApp();
  const isLiked = likedStories.has(story.id);
  const fullContent = storyFullContent(story);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* ── Bandeau catégorie ── */}
        <View
          style={{
            backgroundColor: story.bgColor,
            paddingHorizontal: 20,
            paddingTop: 52,
            paddingBottom: 24,
            alignItems: 'center',
          }}
        >
          {/* Badge catégorie */}
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 4,
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#374151' }}>
              {story.category}
            </Text>
          </View>

          {/* Grand emoji */}
          <Text style={{ fontSize: 80, marginBottom: 16 }}>{story.cover}</Text>

          {/* Titre + note */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '800',
                  color: '#111827',
                  marginBottom: 6,
                  lineHeight: 28,
                }}
              >
                {story.title}
              </Text>
              <Text style={{ fontSize: 13, color: '#374151', marginBottom: 2 }}>
                par {story.author}
              </Text>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>{story.school}</Text>
            </View>
            {/* Note */}
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 6,
                alignItems: 'center',
                marginLeft: 12,
              }}
            >
              <Text style={{ fontSize: 14, color: '#F59E0B' }}>⭐</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#111827' }}>
                {story.rating}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Texte intégral ── */}
        <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
          <Text
            style={{
              fontSize: 16,
              color: '#374151',
              lineHeight: 26,
            }}
          >
            {fullContent}
          </Text>
        </View>
      </ScrollView>

      {/* ── Pied de page fixe ── */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          paddingHorizontal: 20,
          paddingVertical: 14,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* Lectures */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <BookOpen size={16} color="#6B7280" />
          <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '500' }}>
            {story.reads}
          </Text>
        </View>

        {/* Likes */}
        <TouchableOpacity
          onPress={() => toggleLike(story.id)}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
        >
          <Heart
            size={16}
            color={Brand.rose}
            fill={isLiked ? Brand.rose : 'none'}
          />
          <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '500' }}>
            {story.likes + (isLiked ? 1 : 0)}
          </Text>
        </TouchableOpacity>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Bouton Fermer */}
        <TouchableOpacity
          onPress={() => goBack('/(tabs)/home')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: '#F3F4F6',
            paddingHorizontal: 18,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <X size={16} color="#374151" />
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
