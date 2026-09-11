import { router } from 'expo-router';
import { X } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';

const categories = [
  { name: 'Courage', icon: '💪', color: Brand.blue },
  { name: 'Famille', icon: '❤️', color: Brand.rose },
  { name: 'Culture', icon: '🎭', color: Brand.orange },
  { name: 'Honnêteté', icon: '🎯', color: Brand.cyan },
  { name: 'Leadership', icon: '⭐', color: Brand.yellow },
  { name: 'Amitié', icon: '🤝', color: '#10B981' },
];

export function StoryWriter() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    setTimeout(() => router.back(), 2500);
  };

  if (submitted) {
    return (
      <View className="flex-1 bg-white items-center justify-center p-8">
        <Text style={{ fontSize: 72 }} className="mb-6">
          🎉
        </Text>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#111827' }} className="text-center mb-3">
          Conte envoyé !
        </Text>
        <Text style={{ fontSize: 14, color: '#6B7280' }} className="text-center">
          Ton histoire a été soumise pour publication.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 py-4 border-b border-gray-100 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <X size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>Écrire un conte</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151' }} className="mb-2">
          Titre*
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Le Lion Courageux"
          placeholderTextColor="#9CA3AF"
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            padding: 14,
            fontSize: 14,
            color: '#111827',
            marginBottom: 20,
          }}
        />

        <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151' }} className="mb-2">
          Catégorie
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {categories.map((cat) => {
            const active = category === cat.name;
            return (
              <TouchableOpacity
                key={cat.name}
                onPress={() => setCategory(cat.name)}
                style={{
                  borderWidth: 1.5,
                  borderColor: active ? cat.color : '#E5E7EB',
                  backgroundColor: active ? `${cat.color}15` : '#FFFFFF',
                  borderRadius: 20,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Text style={{ fontSize: 14 }}>{cat.icon}</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: active ? cat.color : '#374151' }}>{cat.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151' }} className="mb-2">
          Ton histoire*
        </Text>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Il était une fois..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={12}
          textAlignVertical="top"
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            padding: 14,
            fontSize: 14,
            color: '#111827',
            minHeight: 220,
          }}
        />
        <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>{content.length} caractères</Text>
      </ScrollView>

      <View className="p-5 border-t border-gray-100">
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!canSubmit}
          style={{
            backgroundColor: canSubmit ? Brand.blue : '#D1D5DB',
            borderRadius: 14,
            paddingVertical: 15,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>Soumettre le conte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
