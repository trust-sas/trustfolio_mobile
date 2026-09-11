import { router } from 'expo-router';
import { ChevronRight, Crown, Repeat, Upload, Wallet } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { AddChildModal } from '@/components/screens/parent/AddChildModal';

export function ParentHome() {
  const { familyChildren: children, familyStories, familyName, familySubscription } = useApp();
  const [showAddChild, setShowAddChild] = useState(false);
  const totalRoyalties = children.reduce((sum, c) => sum + c.royaltiesFcfa, 0);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <Text className="text-sm text-gray-500 mb-1">Espace Parent</Text>
      <Text className="text-2xl font-bold mb-4">{familyName}</Text>

      <View className="flex-row gap-3 mb-4">
        {[
          { label: 'Enfants', value: String(children.length) },
          { label: 'Contes', value: String(familyStories.length) },
          { label: 'Royalties (FCFA)', value: String(totalRoyalties) },
        ].map((stat) => (
          <View key={stat.label} className="flex-1 items-center border border-gray-200 rounded-2xl p-3">
            <Text className="text-xl font-bold">{stat.value}</Text>
            <Text className="text-xs text-gray-500 text-center mt-1">{stat.label}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => router.push('/(parent)/portefeuille')}
        className="flex-row items-center justify-between border border-gray-200 rounded-2xl p-4 mb-4"
      >
        <View className="flex-row items-center gap-3">
          <Crown size={20} color={Brand.yellow} />
          <View>
            <Text className="font-semibold">Abonnement {familySubscription.plan}</Text>
            <Text className="text-xs text-gray-500 mt-0.5">
              {familySubscription.priceFcfa.toLocaleString('fr-FR')} FCFA/mois · Renouvellement {familySubscription.renewalDate}
            </Text>
          </View>
        </View>
        <ChevronRight size={20} color="#9CA3AF" />
      </TouchableOpacity>

      <View className="flex-row gap-3 mb-6">
        <TouchableOpacity
          onPress={() => router.push('/parent-upload' as never)}
          style={{ backgroundColor: Brand.blue }}
          className="flex-1 rounded-2xl py-3 items-center flex-row justify-center gap-2"
        >
          <Upload size={18} color="#ffffff" />
          <Text className="text-white font-semibold">Charger un conte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/(parent)/portefeuille')}
          style={{ borderColor: Brand.blue }}
          className="flex-1 rounded-2xl py-3 items-center flex-row justify-center gap-2 border"
        >
          <Wallet size={18} color={Brand.blue} />
          <Text style={{ color: Brand.blue }} className="font-semibold">
            Voir le portefeuille
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold">Mes enfants</Text>
        <TouchableOpacity onPress={() => setShowAddChild(true)}>
          <Text style={{ color: Brand.blue }} className="font-semibold">
            + Ajouter
          </Text>
        </TouchableOpacity>
      </View>

      <View className="gap-3">
        {children.map((child) => (
          <View key={child.id} className="flex-row items-center gap-3 border border-gray-200 rounded-2xl p-4">
            <Text style={{ fontSize: 28 }}>{child.avatarEmoji}</Text>
            <View className="flex-1">
              <Text className="font-semibold">{child.firstName}</Text>
              <Text className="text-xs text-gray-500 mt-0.5">
                {child.age} ans · {child.grade} · {child.school}
              </Text>
              <Text className="text-xs text-gray-500 mt-0.5">
                {child.storiesCount} conte{child.storiesCount > 1 ? 's' : ''} · {child.royaltiesFcfa} FCFA
              </Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => router.push('/change-space' as never)}
        className="flex-row items-center justify-between border border-gray-200 rounded-2xl p-4 mt-6"
      >
        <View className="flex-row items-center gap-3">
          <Repeat size={18} color={Brand.blue} />
          <Text className="font-semibold">Changer d'espace</Text>
        </View>
        <ChevronRight size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <AddChildModal visible={showAddChild} onClose={() => setShowAddChild(false)} />
    </ScrollView>
  );
}
