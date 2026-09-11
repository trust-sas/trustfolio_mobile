import { X } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { students, teacherClasses } from '@/data/teacher';

const categories = [
  { name: 'Courage', icon: '💪', color: Brand.blue },
  { name: 'Famille', icon: '❤️', color: Brand.rose },
  { name: 'Culture', icon: '🎭', color: Brand.orange },
  { name: 'Honnêteté', icon: '🎯', color: Brand.cyan },
  { name: 'Leadership', icon: '⭐', color: Brand.yellow },
  { name: 'Environnement', icon: '🌿', color: '#10B981' },
];

function todayFr(): string {
  return new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export function AddTeacherStoryModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { addTeacherStory } = useApp();
  const [title, setTitle] = useState('');
  const [studentId, setStudentId] = useState('');
  const [category, setCategory] = useState('');

  const studentClassId = teacherClasses.find((c) => c.studentIds.includes(studentId))?.id;
  const canSubmit = title.trim().length > 0 && studentId.length > 0 && !!studentClassId;

  const reset = () => {
    setTitle('');
    setStudentId('');
    setCategory('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAdd = async () => {
    if (!canSubmit || !studentClassId) return;
    await addTeacherStory({
      title: title.trim(),
      studentId,
      classId: studentClassId,
      date: todayFr(),
      category: category || 'Culture',
      status: 'a_verifier',
    });
    handleClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '85%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>Charger un conte</Text>
            <TouchableOpacity onPress={handleClose} className="p-1">
              <X size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Titre*</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Le Marché de Grand-mère"
              placeholderTextColor="#9CA3AF"
              style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 16 }}
            />

            <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Élève*</Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {students.map((s) => {
                const active = s.id === studentId;
                return (
                  <TouchableOpacity
                    key={s.id}
                    onPress={() => setStudentId(s.id)}
                    style={{
                      borderWidth: 1.5,
                      borderColor: active ? Brand.blue : '#E5E7EB',
                      backgroundColor: active ? '#EFF6FF' : '#FFFFFF',
                      borderRadius: 20,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '600', color: active ? Brand.blue : '#374151' }}>
                      {s.firstName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Catégorie</Text>
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
          </ScrollView>

          <TouchableOpacity
            onPress={handleAdd}
            disabled={!canSubmit}
            style={{
              backgroundColor: canSubmit ? Brand.blue : '#D1D5DB',
              borderRadius: 14,
              paddingVertical: 15,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>Charger le conte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
