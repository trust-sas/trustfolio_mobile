import { router } from 'expo-router';
import { ChevronRight, Gift, Repeat } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { classById, referredSubscribedParents, studentById, teacherClasses, teacherName, teacherReferralFcfa } from '@/data/teacher';

const statusStyle: Record<string, { label: string; bg: string; color: string }> = {
  publie: { label: 'Publié', bg: '#DCFCE7', color: '#15803D' },
  en_traitement: { label: 'En traitement', bg: '#DBEAFE', color: '#1D4ED8' },
  a_verifier: { label: 'À vérifier', bg: '#FFEDD5', color: '#C2410C' },
};

export function TeacherDashboard() {
  const { teacherStories } = useApp();
  const publishedCount = teacherStories.filter((s) => s.status === 'publie').length;
  const studentsCount = teacherClasses.reduce((sum, c) => sum + c.studentIds.length, 0);
  const ristournes = referredSubscribedParents * teacherReferralFcfa;
  const recent = [...teacherStories].slice(0, 4);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <Text className="text-sm text-gray-500 mb-1">Espace Enseignant</Text>
      <Text className="text-2xl font-bold mb-4">Bonjour, {teacherName}</Text>

      <View className="flex-row flex-wrap gap-3 mb-4">
        {[
          { label: 'Classes', value: String(teacherClasses.length) },
          { label: 'Élèves', value: String(studentsCount) },
          { label: 'Contes publiés', value: String(publishedCount) },
          { label: 'Ristournes (FCFA)', value: String(ristournes) },
        ].map((stat) => (
          <View key={stat.label} style={{ width: '47%' }} className="items-center border border-gray-200 rounded-2xl p-3">
            <Text className="text-xl font-bold">{stat.value}</Text>
            <Text className="text-xs text-gray-500 text-center mt-1">{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={{ backgroundColor: '#FFF7ED', borderColor: '#FED7AA' }} className="flex-row items-center gap-3 border rounded-2xl p-4 mb-6">
        <Gift size={20} color={Brand.orange} />
        <Text style={{ color: '#C2410C' }} className="text-sm flex-1">
          Ristourne enseignant — {teacherReferralFcfa} FCFA par parent abonné référé / mois
        </Text>
      </View>

      <Text className="text-lg font-bold mb-3">Contes récents</Text>
      <View className="gap-3">
        {recent.map((story) => {
          const status = statusStyle[story.status];
          const student = studentById(story.studentId);
          const cls = classById(story.classId);
          return (
            <View key={story.id} className="border border-gray-200 rounded-2xl p-4">
              <Text className="font-semibold">{story.title}</Text>
              <Text className="text-xs text-gray-500 mt-0.5">
                {student?.firstName} · {cls?.name} · {story.date}
              </Text>
              <View style={{ backgroundColor: status.bg, alignSelf: 'flex-start' }} className="rounded-full px-2 py-0.5 mt-2">
                <Text style={{ color: status.color }} className="text-xs font-semibold">
                  {status.label}
                </Text>
              </View>
            </View>
          );
        })}
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
    </ScrollView>
  );
}
