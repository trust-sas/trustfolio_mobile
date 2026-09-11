import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Camera, ChevronLeft, FileUp, Loader2, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { simulateOCR } from '@/data/ocrMockData';
import { parseExtractedText } from '@/utils/parseStoryText';

type Step = 'child' | 'upload' | 'processing' | 'review' | 'success';

const categoryLabelFr: Record<string, string> = {
  Courage: 'Courage',
  Honesty: 'Honnêteté',
  Leadership: 'Leadership',
  Family: 'Famille',
  Culture: 'Culture',
  Environment: 'Environnement',
};

function todayFr(): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(new Date());
}

export function ParentUploadFlow() {
  const { familyChildren, addFamilyStory } = useApp();
  const [step, setStep] = useState<Step>('child');
  const [childId, setChildId] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const selectedChild = familyChildren.find((c) => c.id === childId);

  const runOcr = async (uri: string) => {
    setImageUri(uri);
    setStep('processing');
    setProgress(0);

    const timer = setInterval(() => setProgress((p) => Math.min(p + 8, 95)), 150);
    const text = await simulateOCR();
    clearInterval(timer);
    setProgress(100);

    const parsed = parseExtractedText(text);
    setTitle(parsed.title);
    setContent(parsed.content);
    setCategory(categoryLabelFr[parsed.category] || parsed.category);
    setStep('review');
  };

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission requise', "L'accès à la caméra est nécessaire pour prendre une photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled && result.assets[0]) runOcr(result.assets[0].uri);
  };

  const pickFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission requise', "L'accès à la galerie est nécessaire pour choisir un fichier.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (!result.canceled && result.assets[0]) runOcr(result.assets[0].uri);
  };

  const canConfirm = title.trim().length > 0 && content.trim().length > 0;

  const handleConfirm = async () => {
    if (!canConfirm || !childId) return;
    await addFamilyStory({
      title: title.trim(),
      childId,
      date: todayFr(),
      category: category || 'Culture',
      status: 'publie',
    });
    setStep('success');
    setTimeout(() => router.back(), 2200);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 py-4 border-b border-gray-100 flex-row items-center justify-between">
        {step !== 'child' && step !== 'processing' && step !== 'success' ? (
          <TouchableOpacity
            onPress={() => setStep(step === 'review' ? 'upload' : 'child')}
            className="p-1"
          >
            <ChevronLeft size={22} color="#111827" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>Charger un conte</Text>
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <X size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      {step === 'child' && (
        <View className="p-5">
          <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 16 }}>Pour quel enfant ?</Text>
          <View className="gap-3">
            {familyChildren.map((child) => (
              <TouchableOpacity
                key={child.id}
                onPress={() => {
                  setChildId(child.id);
                  setStep('upload');
                }}
                className="flex-row items-center gap-3 border border-gray-200 rounded-2xl p-4"
              >
                <Text style={{ fontSize: 26 }}>{child.avatarEmoji}</Text>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827' }}>{child.firstName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {step === 'upload' && (
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
          <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>Conte de : {selectedChild?.firstName}</Text>

          <TouchableOpacity
            onPress={pickFromCamera}
            style={{ borderWidth: 2, borderColor: '#93C5FD', borderStyle: 'dashed', borderRadius: 16 }}
            className="py-8 items-center gap-3 mb-4"
          >
            <Camera size={36} color={Brand.blue} />
            <Text style={{ fontWeight: '700', color: '#111827' }}>Prendre une photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickFromLibrary}
            style={{ borderWidth: 2, borderColor: '#93C5FD', borderStyle: 'dashed', borderRadius: 16 }}
            className="py-8 items-center gap-3 mb-4"
          >
            <FileUp size={36} color={Brand.blue} />
            <View className="items-center">
              <Text style={{ fontWeight: '700', color: '#111827' }}>Photo du manuscrit ou PDF</Text>
              <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>PNG, JPG — jusqu'à 10 Mo</Text>
            </View>
          </TouchableOpacity>

          <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }} className="border rounded-2xl p-4">
            <Text style={{ color: Brand.orange, fontSize: 13, fontWeight: '700', marginBottom: 8 }}>
              💡 Conseils pour une bonne lecture
            </Text>
            {['Écriture lisible', 'Bon éclairage', 'Pas d’ombres'].map((tip) => (
              <Text key={tip} style={{ fontSize: 12, color: '#374151' }}>
                · {tip}
              </Text>
            ))}
          </View>
        </ScrollView>
      )}

      {step === 'processing' && (
        <View className="flex-1 items-center justify-center p-8">
          <Loader2 size={48} color={Brand.blue} />
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 20, marginBottom: 6 }}>
            Lecture du conte...
          </Text>
          <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>Extraction du texte en cours</Text>
          <View style={{ width: '100%', maxWidth: 280 }}>
            <View style={{ height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
              <View style={{ width: `${progress}%`, height: '100%', backgroundColor: Brand.blue }} />
            </View>
            <Text style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginTop: 8 }}>{progress}%</Text>
          </View>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={{ width: 160, height: 160, opacity: 0.5, marginTop: 24, borderRadius: 12 }} resizeMode="contain" />
          )}
        </View>
      )}

      {step === 'review' && (
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
          <View style={{ backgroundColor: '#FEF3C7', borderRadius: 12, padding: 12, marginBottom: 20 }}>
            <Text style={{ fontSize: 12, color: '#92400E' }}>
              Vérifiez le texte extrait avant de publier — corrigez si besoin.
            </Text>
          </View>

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Titre</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 16 }}
          />

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Catégorie</Text>
          <TextInput
            value={category}
            onChangeText={setCategory}
            style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 16 }}
          />

          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Texte du conte</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, minHeight: 180 }}
          />
        </ScrollView>
      )}

      {step === 'success' && (
        <View className="flex-1 items-center justify-center p-8">
          <Text style={{ fontSize: 64, marginBottom: 20 }}>✅</Text>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 8, textAlign: 'center' }}>
            Conte publié !
          </Text>
          <Text style={{ fontSize: 13, color: '#6B7280', textAlign: 'center' }}>
            L'histoire de {selectedChild?.firstName} a été ajoutée à la bibliothèque.
          </Text>
        </View>
      )}

      {step === 'review' && (
        <View className="p-5 border-t border-gray-100">
          <TouchableOpacity
            onPress={handleConfirm}
            disabled={!canConfirm}
            style={{
              backgroundColor: canConfirm ? Brand.blue : '#D1D5DB',
              borderRadius: 14,
              paddingVertical: 15,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>Confirmer et publier</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
