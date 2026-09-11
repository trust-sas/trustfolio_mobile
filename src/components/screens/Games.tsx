import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { gameHref, games } from '@/data/games';

export function Games() {
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
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827' }}>Jeux éducatifs</Text>
      </View>

      {/* ── Liste verticale simple ── */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          {games.map((game, index) => (
            <TouchableOpacity
              key={game.id}
              onPress={() => router.push(gameHref(game.id))}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                gap: 14,
                borderBottomWidth: index !== games.length - 1 ? 1 : 0,
                borderBottomColor: '#F0F0F0',
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: game.bgColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 24 }}>{game.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 2 }}>{game.name}</Text>
                <Text style={{ fontSize: 12, color: '#6B7280' }}>{game.subtitle}</Text>
              </View>
              <ChevronRight size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
