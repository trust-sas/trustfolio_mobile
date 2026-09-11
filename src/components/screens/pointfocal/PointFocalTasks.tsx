import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { schoolById } from '@/data/pointFocal';
import { AddFocalTaskModal } from '@/components/screens/pointfocal/AddFocalTaskModal';

export function PointFocalTasks() {
  const { focalTasks, toggleFocalTask } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  const pending = focalTasks.filter((t) => !t.done);
  const done = focalTasks.filter((t) => t.done);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold">Tâches</Text>
        <TouchableOpacity
          onPress={() => setShowAdd(true)}
          style={{ backgroundColor: Brand.blue }}
          className="rounded-xl px-3 py-2"
        >
          <Text className="text-white text-sm font-semibold">+ Ajouter</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-lg font-bold mb-3">En attente ({pending.length})</Text>
      <View className="gap-2 mb-6">
        {pending.map((task) => {
          const school = schoolById(task.schoolId);
          return (
            <TouchableOpacity
              key={task.id}
              onPress={() => toggleFocalTask(task.id)}
              className="flex-row items-center gap-3 border border-gray-200 rounded-2xl p-4"
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  borderWidth: 1.5,
                  borderColor: '#D1D5DB',
                }}
              />
              <View className="flex-1">
                <Text className="font-semibold">{task.text}</Text>
                <Text className="text-xs text-gray-500 mt-0.5">
                  {school?.name} · {task.date}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {pending.length === 0 && <Text className="text-sm text-gray-400">Aucune tâche en attente.</Text>}
      </View>

      <Text className="text-lg font-bold mb-3">Terminées ({done.length})</Text>
      <View className="gap-2">
        {done.map((task) => {
          const school = schoolById(task.schoolId);
          return (
            <TouchableOpacity
              key={task.id}
              onPress={() => toggleFocalTask(task.id)}
              className="flex-row items-center gap-3 border border-gray-200 rounded-2xl p-4"
              style={{ opacity: 0.6 }}
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  backgroundColor: Brand.blue,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Check size={14} color="#FFFFFF" strokeWidth={3} />
              </View>
              <View className="flex-1">
                <Text className="font-semibold" style={{ textDecorationLine: 'line-through' }}>
                  {task.text}
                </Text>
                <Text className="text-xs text-gray-500 mt-0.5">
                  {school?.name} · {task.date}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {done.length === 0 && <Text className="text-sm text-gray-400">Aucune tâche terminée.</Text>}
      </View>

      <AddFocalTaskModal visible={showAdd} onClose={() => setShowAdd(false)} />
    </ScrollView>
  );
}
