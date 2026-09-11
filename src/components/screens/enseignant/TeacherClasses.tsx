import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { studentById, teacherClasses } from '@/data/teacher';

export function TeacherClasses() {
  const { teacherStories } = useApp();

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <Text className="text-2xl font-bold mb-4">Mes classes</Text>

      <View className="gap-3">
        {teacherClasses.map((cls) => {
          const storiesCount = teacherStories.filter((s) => s.classId === cls.id).length;
          return (
            <View key={cls.id} className="border border-gray-200 rounded-2xl p-4">
              <View className="flex-row items-center justify-between mb-1">
                <Text className="font-bold text-base">{cls.name}</Text>
                <Text className="text-xs text-gray-500">{cls.studentIds.length} élèves</Text>
              </View>
              <Text className="text-xs text-gray-500 mb-3">
                {cls.school} · {storiesCount} conte{storiesCount > 1 ? 's' : ''}
              </Text>

              <View className="flex-row flex-wrap gap-2 mb-3">
                {cls.studentIds.map((studentId) => {
                  const student = studentById(studentId);
                  if (!student) return null;
                  return (
                    <View key={studentId} style={{ backgroundColor: '#F3F4F6' }} className="rounded-full px-3 py-1">
                      <Text className="text-xs text-gray-700 font-medium">
                        {student.firstName} ({student.storiesCount})
                      </Text>
                    </View>
                  );
                })}
              </View>

              <TouchableOpacity
                onPress={() => router.push('/(enseignant)/contes')}
                style={{ borderColor: Brand.blue }}
                className="self-start flex-row items-center gap-1 rounded-xl px-3 py-2 border"
              >
                <Text style={{ color: Brand.blue }} className="text-sm font-semibold">
                  Voir les contes
                </Text>
                <ChevronRight size={16} color={Brand.blue} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
