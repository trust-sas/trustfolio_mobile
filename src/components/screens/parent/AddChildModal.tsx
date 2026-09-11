import { X } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

const avatarOptions = ['👧', '👦', '🧒', '👶', '🧑'];

export function AddChildModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { addChild } = useApp();
  const [avatarEmoji, setAvatarEmoji] = useState(avatarOptions[0]);
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');

  const canSubmit = firstName.trim().length > 0 && age.trim().length > 0;

  const reset = () => {
    setAvatarEmoji(avatarOptions[0]);
    setFirstName('');
    setAge('');
    setGrade('');
    setSchool('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAdd = async () => {
    if (!canSubmit) return;
    await addChild({
      firstName: firstName.trim(),
      avatarEmoji,
      age: Number(age) || 0,
      grade: grade.trim(),
      school: school.trim(),
    });
    handleClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '85%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>Ajouter un enfant</Text>
            <TouchableOpacity onPress={handleClose} className="p-1">
              <X size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            {avatarOptions.map((emoji) => {
              const active = emoji === avatarEmoji;
              return (
                <TouchableOpacity
                  key={emoji}
                  onPress={() => setAvatarEmoji(emoji)}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    borderWidth: 2,
                    borderColor: active ? Brand.blue : '#E5E7EB',
                    backgroundColor: active ? '#EFF6FF' : '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 22 }}>{emoji}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Prénom*</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Ex: Amina"
            placeholderTextColor="#9CA3AF"
            style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 14 }}
          />

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Âge*</Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="Ex: 9"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 14 }}
          />

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Classe</Text>
          <TextInput
            value={grade}
            onChangeText={setGrade}
            placeholder="Ex: CM1"
            placeholderTextColor="#9CA3AF"
            style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 14 }}
          />

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>École</Text>
          <TextInput
            value={school}
            onChangeText={setSchool}
            placeholder="Ex: École Primaire..."
            placeholderTextColor="#9CA3AF"
            style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 20 }}
          />

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
