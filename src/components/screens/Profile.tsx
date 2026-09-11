import { router } from 'expo-router';
import { ChevronRight, LogOut } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { roles } from '@/constants/roles';
import { useApp } from '@/context/AppContext';
import { showConfirm } from '@/utils/alerts';

const badges = [
  { name: 'Premier Conte', emoji: '📖', unlocked: true },
  { name: 'Lecteur Rapide', emoji: '⚡', unlocked: true },
  { name: 'Maître des Jeux', emoji: '🎮', unlocked: true },
  { name: 'Auteur', emoji: '✍️', unlocked: true },
  { name: 'Champion', emoji: '🏆', unlocked: false },
  { name: 'Légende', emoji: '👑', unlocked: false },
];

const subscription = { plan: 'Premium', priceFcfa: 25000, renewalDate: '08/10/2026' };

export function Profile() {
  const { profile, setActiveRole, logOut } = useApp();

  const otherRoles = roles.filter((r) => r.id !== 'enfant');

  const handleSwitchSpace = async (roleId: (typeof otherRoles)[number]['id'], homeHref: string) => {
    await setActiveRole(roleId);
    router.replace(homeHref as never);
  };

  const handleLogOut = () => {
    showConfirm('Se déconnecter', 'Voulez-vous vraiment vous déconnecter ?', async () => {
      await logOut();
      router.replace('/onboarding');
    }, 'Se déconnecter');
  };

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
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: '#F3F4F6',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 32 }}>👧</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 2 }}>{profile.fullName}</Text>
        <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 2 }}>
          {profile.grade} · {profile.school}
        </Text>
        <Text style={{ fontSize: 12, color: '#9CA3AF' }}>Membre depuis janvier 2026</Text>

        {/* 4 stats en ligne */}
        <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
          {[
            { label: 'Contes', value: '24' },
            { label: 'XP', value: '2.4K' },
            { label: 'Badges', value: '4' },
            { label: 'Série', value: '7j' },
          ].map((stat) => (
            <View key={stat.label} style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>{stat.value}</Text>
              <Text style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Abonnement ── */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <View
          style={{
            backgroundColor: Brand.orange,
            borderRadius: 16,
            padding: 18,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
            Abonnement {subscription.plan}
          </Text>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>
            {subscription.priceFcfa.toLocaleString('fr-FR')} FCFA / mois · Renouvellement le {subscription.renewalDate}
          </Text>
        </View>
      </View>

      {/* ── Mes badges ── */}
      <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 12 }}>Mes badges</Text>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 14,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {badges.map((badge) => (
              <View
                key={badge.name}
                style={{
                  width: '28%',
                  alignItems: 'center',
                  gap: 6,
                  paddingVertical: 10,
                  opacity: badge.unlocked ? 1 : 0.4,
                }}
              >
                <Text style={{ fontSize: 28 }}>{badge.emoji}</Text>
                <Text style={{ fontSize: 11, color: '#374151', textAlign: 'center' }}>{badge.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* ── Changer d'espace ── */}
      <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 12 }}>Changer d'espace</Text>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          {otherRoles.map((role, index) => (
            <TouchableOpacity
              key={role.id}
              onPress={() => handleSwitchSpace(role.id, role.homeHref)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 16,
                borderBottomWidth: index !== otherRoles.length - 1 ? 1 : 0,
                borderBottomColor: '#F0F0F0',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Text style={{ fontSize: 20 }}>{role.emoji}</Text>
                <Text style={{ fontSize: 14, color: '#111827' }}>Espace {role.label}</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Se déconnecter ── */}
      <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
        <TouchableOpacity
          onPress={handleLogOut}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            backgroundColor: '#FEF2F2',
            borderWidth: 1,
            borderColor: '#FECACA',
            borderRadius: 14,
            paddingVertical: 14,
          }}
        >
          <LogOut size={18} color="#DC2626" />
          <Text style={{ color: '#DC2626', fontWeight: '600', fontSize: 14 }}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: 'center', fontSize: 11, color: '#9CA3AF', marginTop: 16 }}>TrustFolioKids v1.0.0</Text>
    </ScrollView>
  );
}
