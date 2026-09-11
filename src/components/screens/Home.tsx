import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { gameHref, games } from '@/data/games';
import { storyHref, stories } from '@/data/stories';

const popularStories = stories.filter((s) =>
  ['story-1', 'story-3', 'story-4', 'story-7'].includes(s.id),
);

const homeGames = games.slice(0, 5);

export function Home() {
  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 24 }}>
      {/* ── Header plat ── */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#F0F0F0',
          paddingHorizontal: 20,
          paddingTop: 56,
          paddingBottom: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 2 }}>
          Bonjour, Amina 👋
        </Text>
        <Text style={{ fontSize: 14, color: '#6B7280' }}>
          Continue à explorer et apprendre !
        </Text>

        {/* 3 cartes stats */}
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
          {[
            { label: 'Contes lus', value: '12', emoji: '📚' },
            { label: 'Points XP', value: '450', emoji: '⭐' },
            { label: 'Badges', value: '4', emoji: '🏅' },
          ].map((stat) => (
            <View
              key={stat.label}
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 12,
                padding: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 2 }}>{stat.emoji}</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }}>
                {stat.value}
              </Text>
              <Text style={{ fontSize: 11, color: '#6B7280', textAlign: 'center', marginTop: 2 }}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Contes populaires ── */}
      <View style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>
            Contes populaires
          </Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/stories')}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: Brand.blue }}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 12 }}>
          {popularStories.map((story) => (
            <TouchableOpacity
              key={story.id}
              onPress={() => router.push(storyHref(story.id))}
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 14,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                gap: 12,
              }}
            >
              {/* Couverture */}
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 10,
                  backgroundColor: story.bgColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 28 }}>{story.cover}</Text>
              </View>

              {/* Infos */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 2 }}
                  numberOfLines={1}
                >
                  {story.title}
                </Text>
                <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>
                  par {story.author}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontSize: 12, color: '#F59E0B' }}>⭐</Text>
                  <Text style={{ fontSize: 12, color: '#6B7280' }}>
                    {story.rating} · {story.reads} lectures
                  </Text>
                </View>
              </View>

              {/* Bouton Lire */}
              <TouchableOpacity
                onPress={() => router.push(storyHref(story.id))}
                style={{
                  backgroundColor: Brand.blue,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600' }}>Lire</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Jeux éducatifs ── */}
      <View style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>
            Jeux éducatifs
          </Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/games')}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: Brand.blue }}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          {homeGames.map((game, index) => (
            <TouchableOpacity
              key={game.id}
              onPress={() => router.push(gameHref(game.id))}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 14,
                gap: 14,
                borderBottomWidth: index !== homeGames.length - 1 ? 1 : 0,
                borderBottomColor: '#F0F0F0',
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: game.bgColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 22 }}>{game.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 2 }}>
                  {game.name}
                </Text>
                <Text style={{ fontSize: 12, color: '#6B7280' }}>{game.subtitle}</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Écrire un conte ── */}
      <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
        <View
          style={{
            backgroundColor: Brand.blue,
            borderRadius: 16,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
              Écrire un conte ✍️
            </Text>
            <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 18 }}>
              Partage ton histoire avec le monde
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/write')}
            style={{
              backgroundColor: '#FFFFFF',
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: Brand.blue, fontSize: 14, fontWeight: '700' }}>Créer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
