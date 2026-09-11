import { X } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

function inTwoWeeksFr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export function AddFocalTaskModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { schools, addFocalTask } = useApp();
  const [text, setText] = useState('');
  const [schoolId, setSchoolId] = useState('');

  const canSubmit = text.trim().length > 0 && schoolId.length > 0;

  const reset = () => {
    setText('');
    setSchoolId('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAdd = async () => {
    if (!canSubmit) return;
    await addFocalTask({ text: text.trim(), schoolId, date: inTwoWeeksFr() });
    handleClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '85%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>Ajouter une tâche</Text>
            <TouchableOpacity onPress={handleClose} className="p-1">
              <X size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Tâche*</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Ex: Relancer pour signature de convention"
            placeholderTextColor="#9CA3AF"
            style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 16 }}
          />

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>École*</Text>
          <ScrollView style={{ maxHeight: 180 }} showsVerticalScrollIndicator={false}>
            <View className="gap-2 mb-6">
              {schools.map((school) => {
                const active = school.id === schoolId;
                return (
                  <TouchableOpacity
                    key={school.id}
                    onPress={() => setSchoolId(school.id)}
                    style={{
                      borderWidth: 1.5,
                      borderColor: active ? Brand.blue : '#E5E7EB',
                      backgroundColor: active ? '#EFF6FF' : '#FFFFFF',
                      borderRadius: 12,
                      padding: 12,
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '600', color: active ? Brand.blue : '#374151' }}>{school.name}</Text>
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
            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
