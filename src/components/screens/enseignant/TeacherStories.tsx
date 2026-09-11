import { BookPlus, Upload } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { classById, studentById } from '@/data/teacher';
import { AddTeacherStoryModal } from '@/components/screens/enseignant/AddTeacherStoryModal';
import { CreateAnthologyModal } from '@/components/screens/enseignant/CreateAnthologyModal';

const statusStyle: Record<string, { label: string; bg: string; color: string }> = {
  publie: { label: 'Publié', bg: '#DCFCE7', color: '#15803D' },
  en_traitement: { label: 'En traitement', bg: '#DBEAFE', color: '#1D4ED8' },
  a_verifier: { label: 'À vérifier', bg: '#FFEDD5', color: '#C2410C' },
};

export function TeacherStories() {
  const { teacherStories } = useApp();
  const [showUpload, setShowUpload] = useState(false);
  const [anthologyStoryId, setAnthologyStoryId] = useState<string | null>(null);
  const [showAnthology, setShowAnthology] = useState(false);

  const openAnthologyFor = (storyId: string) => {
    setAnthologyStoryId(storyId);
    setShowAnthology(true);
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold">Contes des classes</Text>
        <TouchableOpacity
          onPress={() => setShowUpload(true)}
          style={{ backgroundColor: Brand.blue }}
          className="flex-row items-center gap-2 rounded-xl px-3 py-2"
        >
          <Upload size={16} color="#ffffff" />
          <Text className="text-white text-sm font-semibold">Charger</Text>
        </TouchableOpacity>
      </View>

      <View className="gap-3">
        {teacherStories.map((story) => {
          const status = statusStyle[story.status];
          const student = studentById(story.studentId);
          const cls = classById(story.classId);
          return (
            <View key={story.id} className="border border-gray-200 rounded-2xl p-4">
              <Text className="font-semibold">{story.title}</Text>
              <Text className="text-xs text-gray-500 mt-0.5">
                {student?.firstName} · {cls?.name} · {story.date}
              </Text>
              <View className="flex-row gap-2 mt-2">
                <View style={{ backgroundColor: '#F3F4F6' }} className="rounded-full px-2 py-0.5">
                  <Text className="text-xs text-gray-600">{story.category}</Text>
                </View>
                <View style={{ backgroundColor: status.bg }} className="rounded-full px-2 py-0.5">
                  <Text style={{ color: status.color }} className="text-xs font-semibold">
                    {status.label}
                  </Text>
                </View>
              </View>

              {story.status === 'publie' && (
                <TouchableOpacity
                  onPress={() => openAnthologyFor(story.id)}
                  style={{ borderColor: Brand.blue }}
                  className="self-start flex-row items-center gap-1 rounded-xl px-3 py-2 border mt-3"
                >
                  <BookPlus size={14} color={Brand.blue} />
                  <Text style={{ color: Brand.blue }} className="text-xs font-semibold">
                    Ajouter à une anthologie
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>

      <AddTeacherStoryModal visible={showUpload} onClose={() => setShowUpload(false)} />
      <CreateAnthologyModal
        visible={showAnthology}
        onClose={() => {
          setShowAnthology(false);
          setAnthologyStoryId(null);
        }}
        preselectedStoryId={anthologyStoryId}
      />
    </ScrollView>
  );
}
