import { Check, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { classById, studentById } from '@/data/teacher';

export function CreateAnthologyModal({
  visible,
  onClose,
  preselectedStoryId,
}: {
  visible: boolean;
  onClose: () => void;
  preselectedStoryId?: string | null;
}) {
  const { teacherStories, createAnthology } = useApp();
  const publishedStories = teacherStories.filter((s) => s.status === 'publie');

  const [title, setTitle] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (visible) {
      setSelectedIds(preselectedStoryId ? [preselectedStoryId] : []);
    }
  }, [visible, preselectedStoryId]);

  const toggleStory = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const canSubmit = title.trim().length > 0 && selectedIds.length > 0;

  const handleClose = () => {
    setTitle('');
    setSelectedIds([]);
    onClose();
  };

  const handleCreate = async () => {
    if (!canSubmit) return;
    const classIds = [...new Set(selectedIds.map((id) => teacherStories.find((s) => s.id === id)?.classId).filter(Boolean))] as string[];
    await createAnthology(title.trim(), selectedIds, classIds);
    handleClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '85%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>Créer une anthologie</Text>
            <TouchableOpacity onPress={handleClose} className="p-1">
              <X size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Titre*</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Recueil CM1 A — Trimestre 2"
            placeholderTextColor="#9CA3AF"
            style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 16 }}
          />

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 10 }}>
            Contes publiés ({selectedIds.length} sélectionné{selectedIds.length > 1 ? 's' : ''})
          </Text>

          <ScrollView style={{ maxHeight: 260 }} showsVerticalScrollIndicator={false}>
            <View className="gap-2 mb-4">
              {publishedStories.map((story) => {
                const checked = selectedIds.includes(story.id);
                const student = studentById(story.studentId);
                const cls = classById(story.classId);
                return (
                  <TouchableOpacity
                    key={story.id}
                    onPress={() => toggleStory(story.id)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      borderWidth: 1,
                      borderColor: checked ? Brand.blue : '#E5E7EB',
                      backgroundColor: checked ? '#EFF6FF' : '#FFFFFF',
                      borderRadius: 12,
                      padding: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5,
                        borderWidth: 1.5,
                        borderColor: checked ? Brand.blue : '#D1D5DB',
                        backgroundColor: checked ? Brand.blue : '#FFFFFF',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {checked && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                    </View>
                    <View className="flex-1">
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}>{story.title}</Text>
                      <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                        {student?.firstName} · {cls?.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={handleCreate}
            disabled={!canSubmit}
            style={{
              backgroundColor: canSubmit ? Brand.blue : '#D1D5DB',
              borderRadius: 14,
              paddingVertical: 15,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>Créer ({selectedIds.length} conte{selectedIds.length > 1 ? 's' : ''})</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
