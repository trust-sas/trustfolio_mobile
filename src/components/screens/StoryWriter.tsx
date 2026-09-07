import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Camera, FileText, Image as ImageIcon, Loader2, Sparkles, Upload, X } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { simulateOCR } from '@/data/ocrMockData';
import { parseExtractedText } from '@/utils/parseStoryText';

type Step = 'method' | 'category' | 'upload' | 'ocr-processing' | 'ocr-review' | 'write' | 'preview' | 'success';

interface AuthorInfo {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  grade: string;
  school: string;
}

const categories = [
  { name: 'Courage', icon: '💪', color: Brand.blue },
  { name: 'Honesty', icon: '🎯', color: Brand.cyan },
  { name: 'Leadership', icon: '⭐', color: Brand.yellow },
  { name: 'Family', icon: '❤️', color: Brand.rose },
  { name: 'Culture', icon: '🎭', color: Brand.orange },
  { name: 'Environment', icon: '🌳', color: '#10B981' },
];

const educationalValues = [
  { name: 'Courage', icon: '💪', color: Brand.blue },
  { name: 'Honesty', icon: '🎯', color: Brand.cyan },
  { name: 'Leadership', icon: '⭐', color: Brand.yellow },
  { name: 'Respect', icon: '🤝', color: '#10B981' },
  { name: 'Perseverance', icon: '🏃', color: Brand.orange },
  { name: 'Creativity', icon: '🎨', color: Brand.rose },
  { name: 'Teamwork', icon: '👥', color: '#8B5CF6' },
  { name: 'Responsibility', icon: '✅', color: '#06B6D4' },
];

export function StoryWriter() {
  const [step, setStep] = useState<Step>('method');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorInfo, setAuthorInfo] = useState<AuthorInfo>({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    grade: '',
    school: '',
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [showValuesSelection, setShowValuesSelection] = useState(false);
  const [aiGeneration, setAiGeneration] = useState({
    enabled: false,
    generating: false,
    progress: 0,
    improvedStory: '',
    illustrations: [] as string[],
    selectedValues: [] as string[],
  });

  const runOcr = async (imageUri: string) => {
    setUploadedImage(imageUri);
    setStep('ocr-processing');
    setOcrProgress(0);

    const progressTimer = setInterval(() => {
      setOcrProgress((p) => Math.min(p + 8, 95));
    }, 150);

    const text = await simulateOCR();
    clearInterval(progressTimer);
    setOcrProgress(100);

    const parsed = parseExtractedText(text);
    setAuthorInfo(parsed.authorInfo);
    if (parsed.title) setTitle(parsed.title);
    setContent(parsed.content);
    if (parsed.category) setCategory(parsed.category);

    setStep('ocr-review');
  };

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission requise", "L'accès à la caméra est nécessaire pour prendre une photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled && result.assets[0]) {
      runOcr(result.assets[0].uri);
    }
  };

  const pickFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission requise', "L'accès à la galerie est nécessaire pour choisir une image.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (!result.canceled && result.assets[0]) {
      runOcr(result.assets[0].uri);
    }
  };

  const toggleValue = (valueName: string) => {
    setAiGeneration((prev) => {
      const selected = prev.selectedValues.includes(valueName)
        ? prev.selectedValues.filter((v) => v !== valueName)
        : [...prev.selectedValues, valueName];
      return { ...prev, selectedValues: selected };
    });
  };

  const generateAIEnhancedStory = async () => {
    setShowValuesSelection(false);
    setAiGeneration((prev) => ({ ...prev, generating: true, progress: 0 }));

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setAiGeneration((prev) => ({ ...prev, progress: i }));
    }

    setAiGeneration((prev) => {
      const valuesText = prev.selectedValues.length > 0 ? `\n\n📚 Valeurs éducatives intégrées: ${prev.selectedValues.join(', ')}\n\n` : '\n\n';
      const improvedStory = `${content}${valuesText}[Cette histoire a été enrichie par TrustFolioKids avec une structure narrative améliorée, des descriptions vivantes, des dialogues naturels et l'intégration de valeurs éducatives africaines. Le style d'écriture est adapté pour captiver les jeunes lecteurs tout en transmettant des messages positifs.]`;
      return {
        ...prev,
        enabled: true,
        generating: false,
        progress: 100,
        improvedStory,
        illustrations: ['🎨', '🖼️', '🌟', '✨'],
      };
    });
  };

  const handleSubmit = () => {
    setStep('success');
    setTimeout(() => router.back(), 3000);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 py-4 border-b border-gray-200 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <X size={24} color="#000000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Young Creator's Lab</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1">
        {step === 'method' && (
          <View className="p-6">
            <View className="items-center mb-8">
              <Text style={{ fontSize: 56 }} className="mb-4">
                ✍️
              </Text>
              <Text className="text-2xl mb-2 font-bold text-center">Créer Votre Histoire</Text>
              <Text className="text-gray-600 text-center">Choisissez comment vous voulez créer votre histoire</Text>
            </View>

            <View className="gap-4">
              <TouchableOpacity
                onPress={() => setStep('upload')}
                style={{ borderColor: '#BFDBFE' }}
                className="border-2 rounded-2xl p-6 bg-blue-50 flex-row items-center gap-4"
              >
                <View style={{ backgroundColor: Brand.blue }} className="w-16 h-16 rounded-full items-center justify-center">
                  <Camera size={28} color="#ffffff" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg mb-1 font-bold">Charger une Image</Text>
                  <Text className="text-sm text-gray-600">Prenez une photo de votre histoire manuscrite et notre IA la lira pour vous</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setStep('category')}
                style={{ borderColor: '#E9D5FF' }}
                className="border-2 rounded-2xl p-6 bg-purple-50 flex-row items-center gap-4"
              >
                <View style={{ backgroundColor: Brand.rose }} className="w-16 h-16 rounded-full items-center justify-center">
                  <FileText size={28} color="#ffffff" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg mb-1 font-bold">Écrire Directement</Text>
                  <Text className="text-sm text-gray-600">Tapez votre histoire directement dans l'application</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 'upload' && (
          <View className="p-6">
            <View className="items-center mb-8">
              <Text style={{ fontSize: 56 }} className="mb-4">
                📸
              </Text>
              <Text className="text-2xl mb-2 font-bold text-center">Charger Votre Histoire</Text>
              <Text className="text-gray-600 text-center">Prenez une photo ou chargez une image de votre histoire manuscrite</Text>
            </View>

            <View className="gap-4">
              <TouchableOpacity
                onPress={pickFromCamera}
                style={{ borderColor: '#93C5FD' }}
                className="border-2 border-dashed rounded-2xl py-8 items-center gap-3"
              >
                <Camera size={40} color={Brand.blue} />
                <Text className="text-base font-bold">Prendre une photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={pickFromLibrary}
                style={{ borderColor: '#93C5FD' }}
                className="border-2 border-dashed rounded-2xl py-8 items-center gap-3"
              >
                <Upload size={40} color={Brand.blue} />
                <View className="items-center">
                  <Text className="text-base font-bold">Choisir depuis la galerie</Text>
                  <Text className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 10MB</Text>
                </View>
              </TouchableOpacity>

              <View style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }} className="border rounded-2xl p-4">
                <Text style={{ color: Brand.orange }} className="text-sm mb-2 font-bold">
                  💡 Conseils pour une meilleure lecture
                </Text>
                <View className="gap-1">
                  {[
                    "Assurez-vous que l'écriture est claire et lisible",
                    'Prenez la photo dans un bon éclairage',
                    'Évitez les ombres sur le texte',
                    'Utilisez le template fourni si possible',
                  ].map((tip) => (
                    <Text key={tip} className="text-xs text-gray-700">
                      ✓ {tip}
                    </Text>
                  ))}
                </View>
              </View>

              <TouchableOpacity onPress={() => setStep('method')} className="bg-gray-100 rounded-xl py-3 items-center">
                <Text className="text-gray-700 font-semibold">Retour</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 'ocr-processing' && (
          <View className="p-6 items-center justify-center" style={{ minHeight: 400 }}>
            <Loader2 size={56} color={Brand.blue} />
            <Text className="text-2xl mb-2 mt-6 font-bold text-center">Lecture de votre histoire...</Text>
            <Text className="text-gray-600 mb-6 text-center">Notre IA analyse votre écriture manuscrite</Text>

            <View className="w-full max-w-sm">
              <View className="bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
                <View style={{ width: `${ocrProgress}%`, backgroundColor: Brand.blue }} className="h-full" />
              </View>
              <Text className="text-sm text-gray-600 text-center">{ocrProgress}% complété</Text>
            </View>

            {uploadedImage && (
              <Image source={{ uri: uploadedImage }} style={{ width: 220, height: 220, opacity: 0.5, marginTop: 24, borderRadius: 16 }} resizeMode="contain" />
            )}
          </View>
        )}

        {step === 'ocr-review' && (
          <View className="p-6">
            <View className="items-center mb-6">
              <Text style={{ fontSize: 56 }} className="mb-4">
                ✅
              </Text>
              <Text className="text-2xl mb-2 font-bold text-center">Vérifiez et Modifiez</Text>
              <Text className="text-gray-600 text-center">Vérifiez que tout est correct, vous pouvez modifier si besoin</Text>
            </View>

            {uploadedImage && (
              <Image
                source={{ uri: uploadedImage }}
                style={{ width: '100%', height: 200, borderRadius: 16, marginBottom: 24 }}
                resizeMode="contain"
              />
            )}

            <View className="gap-4">
              <View className="bg-white border border-gray-200 rounded-2xl p-4">
                <Text className="text-sm mb-3 font-bold">Informations de l'auteur</Text>
                <View className="flex-row flex-wrap gap-3">
                  {[
                    { key: 'firstName', label: 'Prénom' },
                    { key: 'lastName', label: 'Nom' },
                    { key: 'age', label: 'Âge' },
                    { key: 'gender', label: 'Genre' },
                    { key: 'grade', label: 'Classe' },
                    { key: 'school', label: 'École' },
                  ].map((field) => (
                    <View key={field.key} style={{ width: '47%' }}>
                      <Text className="text-xs mb-1 text-gray-600">{field.label}</Text>
                      <TextInput
                        value={authorInfo[field.key as keyof AuthorInfo]}
                        onChangeText={(v) => setAuthorInfo({ ...authorInfo, [field.key]: v })}
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </View>
                  ))}
                </View>
              </View>

              <View className="bg-white border border-gray-200 rounded-2xl p-4">
                <Text className="text-sm mb-2 font-bold">Titre de l'histoire</Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Le titre de votre histoire..."
                  className="w-full p-3 border border-gray-200 rounded-lg"
                />
              </View>

              <View className="bg-white border border-gray-200 rounded-2xl p-4">
                <Text className="text-sm mb-2 font-bold">Contenu de l'histoire</Text>
                <TextInput
                  value={content}
                  onChangeText={setContent}
                  multiline
                  numberOfLines={10}
                  textAlignVertical="top"
                  placeholder="Le contenu de votre histoire..."
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  style={{ minHeight: 160 }}
                />
                <Text className="text-xs text-gray-500 mt-2">{content.length} caractères</Text>
              </View>

              <View className="bg-white border border-gray-200 rounded-2xl p-4">
                <Text className="text-sm mb-3 font-bold">
                  Catégorie {category ? '✓ Détectée automatiquement' : ''}
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.name}
                      onPress={() => setCategory(cat.name)}
                      style={{
                        width: '30%',
                        borderWidth: 2,
                        borderColor: category === cat.name ? cat.color : '#E5E7EB',
                      }}
                      className="p-3 rounded-xl items-center"
                    >
                      <Text style={{ fontSize: 28 }} className="mb-1">
                        {cat.icon}
                      </Text>
                      <Text className="text-xs text-center font-semibold">{cat.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        {step === 'category' && (
          <View className="p-6">
            <View className="items-center mb-8">
              <Text style={{ fontSize: 56 }} className="mb-4">
                ✍️
              </Text>
              <Text className="text-2xl mb-2 font-bold text-center">Create Your Story</Text>
              <Text className="text-gray-600 text-center">Choose a category for your story</Text>
            </View>

            <View className="flex-row flex-wrap gap-4">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.name}
                  onPress={() => {
                    setCategory(cat.name);
                    setStep('write');
                  }}
                  style={{ width: '47%', borderWidth: 2, borderColor: category === cat.name ? cat.color : '#E5E7EB' }}
                  className="p-6 rounded-2xl items-center"
                >
                  <Text style={{ fontSize: 44 }} className="mb-3">
                    {cat.icon}
                  </Text>
                  <Text className="text-lg font-semibold">{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {step === 'write' && (
          <View className="p-6">
            <TouchableOpacity onPress={() => setStep('category')} className="mb-4">
              <Text className="text-sm text-gray-600">← Change Category</Text>
            </TouchableOpacity>
            <View className="bg-gray-50 rounded-xl p-3 mb-4">
              <Text className="text-sm text-gray-600">Category</Text>
              <Text className="text-lg font-bold">{category}</Text>
            </View>

            <View className="gap-4">
              <View>
                <Text className="text-sm mb-2 font-semibold">Story Title</Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter your story title..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl"
                />
              </View>

              <View>
                <Text className="text-sm mb-2 font-semibold">Your Story</Text>
                <TextInput
                  value={content}
                  onChangeText={setContent}
                  placeholder="Once upon a time..."
                  multiline
                  numberOfLines={12}
                  textAlignVertical="top"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl"
                  style={{ minHeight: 220 }}
                />
                <Text className="text-xs text-gray-500 mt-2">{content.length} characters</Text>
              </View>

              <View style={{ borderColor: '#D1D5DB' }} className="border-2 border-dashed rounded-xl py-6 items-center flex-row justify-center gap-2">
                <ImageIcon size={20} color="#6B7280" />
                <Text className="text-gray-600 font-semibold">Add Cover Image (Optional)</Text>
              </View>
            </View>
          </View>
        )}

        {step === 'preview' && (
          <View className="p-6">
            <Text className="text-2xl mb-6 font-bold">Prévisualisation de votre histoire</Text>

            {(authorInfo.firstName || authorInfo.lastName) && (
              <View className="bg-gray-50 rounded-2xl p-4 mb-6">
                <Text className="text-sm mb-2 font-bold">Auteur</Text>
                <Text className="text-sm">
                  {authorInfo.firstName} {authorInfo.lastName}
                  {authorInfo.age ? `, ${authorInfo.age} ans` : ''}
                  {authorInfo.grade ? ` - ${authorInfo.grade}` : ''}
                </Text>
                {authorInfo.school ? <Text className="text-xs text-gray-600 mt-1">{authorInfo.school}</Text> : null}
              </View>
            )}

            <View style={{ backgroundColor: '#C084FC' }} className="rounded-3xl p-12 mb-6 items-center">
              <Text style={{ fontSize: 72 }} className="mb-4">
                📖
              </Text>
              <View className="bg-white/90 rounded-2xl p-6 items-center w-full">
                <Text className="text-2xl mb-2 font-bold text-center">{title}</Text>
                <Text className="text-sm text-gray-600 mb-1">Écrit par</Text>
                <Text className="text-lg font-semibold">
                  {authorInfo.firstName || 'Amina'} {authorInfo.lastName || 'K.'}
                </Text>
              </View>
            </View>

            {!aiGeneration.enabled && !aiGeneration.generating && (
              <View style={{ borderColor: '#BFDBFE' }} className="bg-blue-50 border-2 rounded-2xl p-5 mb-6">
                <View className="flex-row items-start gap-3 mb-4">
                  <Sparkles size={22} color={Brand.blue} />
                  <View className="flex-1">
                    <Text style={{ color: Brand.blue }} className="text-lg mb-2 font-bold">
                      Améliorer avec TrustFolioKids
                    </Text>
                    <Text className="text-sm text-gray-700 mb-3">Notre plateforme peut enrichir votre histoire avec:</Text>
                    <View className="gap-1 mb-4">
                      {[
                        '✨ Structure narrative améliorée',
                        '🎨 Descriptions plus vivantes',
                        '💬 Dialogues enrichis',
                        "🖼️ Suggestions d'illustrations",
                        '📚 Corrections grammaticales',
                        '🌍 Intégration de valeurs éducatives africaines',
                      ].map((line) => (
                        <Text key={line} className="text-sm text-gray-700">
                          {line}
                        </Text>
                      ))}
                    </View>

                    {!showValuesSelection && (
                      <TouchableOpacity
                        onPress={() => setShowValuesSelection(true)}
                        style={{ backgroundColor: Brand.blue }}
                        className="rounded-xl py-3 flex-row items-center justify-center gap-2"
                      >
                        <Sparkles size={20} color="#ffffff" />
                        <Text className="text-white font-semibold">Améliorer avec TrustFolioKids</Text>
                      </TouchableOpacity>
                    )}

                    {showValuesSelection && (
                      <View className="mt-4">
                        <Text className="text-sm mb-3 font-semibold">Choisissez les valeurs éducatives à intégrer (optionnel):</Text>
                        <View className="flex-row flex-wrap gap-2 mb-4">
                          {educationalValues.map((value) => {
                            const selected = aiGeneration.selectedValues.includes(value.name);
                            return (
                              <TouchableOpacity
                                key={value.name}
                                onPress={() => toggleValue(value.name)}
                                style={{ width: '47%', borderWidth: 2, borderColor: selected ? value.color : '#E5E7EB' }}
                                className="p-3 rounded-xl flex-row items-center gap-2"
                              >
                                <Text className="text-xl">{value.icon}</Text>
                                <Text className="text-sm font-semibold">{value.name}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                        <View className="flex-row gap-2">
                          <TouchableOpacity onPress={() => setShowValuesSelection(false)} className="flex-1 bg-gray-100 rounded-xl py-3 items-center">
                            <Text className="text-gray-700 font-semibold">Annuler</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={generateAIEnhancedStory}
                            style={{ backgroundColor: Brand.cyan }}
                            className="flex-1 rounded-xl py-3 flex-row items-center justify-center gap-2"
                          >
                            <Sparkles size={20} color="#ffffff" />
                            <Text className="text-white font-semibold">Générer</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}

            {aiGeneration.generating && (
              <View className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 items-center">
                <Loader2 size={44} color={Brand.blue} />
                <Text className="text-lg mb-2 mt-4 font-bold">Amélioration en cours...</Text>
                <Text className="text-sm text-gray-600 mb-4">TrustFolioKids enrichit votre histoire</Text>
                <View className="bg-gray-200 rounded-full h-3 overflow-hidden w-full">
                  <View style={{ width: `${aiGeneration.progress}%`, backgroundColor: Brand.blue }} className="h-full" />
                </View>
              </View>
            )}

            <View className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
              <Text className="text-sm mb-3 font-bold">{aiGeneration.enabled ? 'Histoire originale' : 'Votre histoire'}</Text>
              <Text className="text-lg" style={{ lineHeight: 26 }}>
                {content}
              </Text>
            </View>

            {aiGeneration.enabled && aiGeneration.improvedStory && (
              <View style={{ borderColor: '#BFDBFE' }} className="bg-blue-50 border-2 rounded-2xl p-6 mb-6">
                <View className="flex-row items-center gap-2 mb-3">
                  <Sparkles size={18} color={Brand.blue} />
                  <Text style={{ color: Brand.blue }} className="text-sm font-bold">
                    Version améliorée par TrustFolioKids
                  </Text>
                </View>
                <Text className="text-base mb-4" style={{ lineHeight: 24 }}>
                  {aiGeneration.improvedStory}
                </Text>

                {aiGeneration.selectedValues.length > 0 && (
                  <View className="mb-4">
                    <Text className="text-sm mb-2 font-semibold">Valeurs éducatives intégrées</Text>
                    <View className="flex-row flex-wrap gap-2">
                      {aiGeneration.selectedValues.map((value) => {
                        const valueData = educationalValues.find((v) => v.name === value);
                        return (
                          <View
                            key={value}
                            style={{ backgroundColor: `${valueData?.color}20` }}
                            className="flex-row items-center gap-1 px-3 py-1 rounded-full"
                          >
                            <Text>{valueData?.icon}</Text>
                            <Text style={{ color: valueData?.color }} className="text-xs font-semibold">
                              {value}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}

                {aiGeneration.illustrations.length > 0 && (
                  <View>
                    <Text className="text-sm mb-2 font-semibold">Illustrations suggérées</Text>
                    <View className="flex-row flex-wrap gap-2">
                      {aiGeneration.illustrations.map((ill, i) => (
                        <View key={i} style={{ borderColor: Brand.blue, width: '22%' }} className="bg-white rounded-lg p-4 items-center border">
                          <Text className="text-2xl">{ill}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}

            <View className="mb-4 self-start rounded-full px-3 py-1" style={{ backgroundColor: Brand.blueLightFill }}>
              <Text className="text-xs" style={{ color: Brand.blue }}>
                {category}
              </Text>
            </View>
          </View>
        )}

        {step === 'success' && (
          <View className="items-center justify-center p-6" style={{ minHeight: 500 }}>
            <Text style={{ fontSize: 88 }} className="mb-6">
              🎉
            </Text>
            <Text className="text-3xl mb-4 font-bold text-center">Story Submitted!</Text>
            <Text className="text-lg text-gray-600 mb-6 text-center">
              Congratulations! Your story has been submitted for review. It will be published soon and other children will be able to read it!
            </Text>
            <View style={{ borderColor: '#FDE68A' }} className="bg-yellow-50 rounded-2xl p-6 border items-center">
              <Text style={{ fontSize: 44 }} className="mb-3">
                🏆
              </Text>
              <Text className="text-sm text-gray-700 text-center font-semibold">You earned 100 XP and the "Young Author" badge!</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {step === 'ocr-review' && (
        <View className="p-4 border-t border-gray-200 flex-row gap-3">
          <TouchableOpacity onPress={() => setStep('upload')} className="flex-1 bg-gray-100 rounded-xl py-4 items-center">
            <Text className="text-gray-700 font-semibold">Recharger une image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStep('preview')}
            disabled={!title || !content}
            style={{ backgroundColor: !title || !content ? '#D1D5DB' : Brand.blue }}
            className="flex-1 rounded-xl py-4 items-center"
          >
            <Text className="text-white font-semibold">Continuer</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 'write' && (
        <View className="p-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={() => setStep('preview')}
            disabled={!title || !content}
            style={{ backgroundColor: !title || !content ? '#D1D5DB' : Brand.blue }}
            className="rounded-xl py-4 items-center"
          >
            <Text className="text-white font-semibold">Preview Story</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 'preview' && (
        <View className="p-4 border-t border-gray-200 flex-row gap-3">
          <TouchableOpacity onPress={() => setStep(uploadedImage ? 'ocr-review' : 'write')} className="flex-1 bg-gray-100 rounded-xl py-4 items-center">
            <Text className="text-gray-700 font-semibold">Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={aiGeneration.generating}
            style={{ backgroundColor: aiGeneration.generating ? '#D1D5DB' : Brand.cyan }}
            className="flex-1 rounded-xl py-4 flex-row items-center justify-center gap-2"
          >
            <Sparkles size={20} color="#ffffff" />
            <Text className="text-white font-semibold">{aiGeneration.enabled ? 'Publier (version TrustFolioKids)' : "Publier l'histoire"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
