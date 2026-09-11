import { router } from 'expo-router';
import { X } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { roles } from '@/constants/roles';
import { useApp } from '@/context/AppContext';

export function ChangeSpace() {
  const { activeRole, setActiveRole } = useApp();

  const handleSelect = async (roleId: (typeof roles)[number]['id'], homeHref: string) => {
    if (roleId === activeRole) {
      router.back();
      return;
    }
    await setActiveRole(roleId);
    router.replace(homeHref as never);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 flex-row items-center justify-between border-b border-gray-100">
        <Text className="text-lg font-bold">Changer d'espace</Text>
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <X size={22} color="#374151" />
        </TouchableOpacity>
      </View>

      <View className="p-4 gap-3">
        {roles.map((role) => {
          const active = role.id === activeRole;
          return (
            <TouchableOpacity
              key={role.id}
              onPress={() => handleSelect(role.id, role.homeHref)}
              style={{ borderColor: active ? Brand.blue : '#E5E7EB' }}
              className="flex-row items-center justify-between p-4 rounded-2xl border"
            >
              <View className="flex-row items-center gap-3">
                <Text style={{ fontSize: 22 }}>{role.emoji}</Text>
                <Text className="text-base font-semibold">{role.label}</Text>
              </View>
              {active && (
                <View style={{ backgroundColor: Brand.blue }} className="rounded-full px-3 py-1">
                  <Text className="text-white text-xs font-semibold">Actif</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
