import { router } from 'expo-router';
import { ChevronLeft, Phone, TrendingUp } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { focalReferralFcfa, pipelineStages, stageLabel } from '@/data/pointFocal';

export function SchoolDetail({ schoolId }: { schoolId: string }) {
  const { schools, saveSchoolReport } = useApp();
  const school = schools.find((s) => s.id === schoolId);
  const [notes, setNotes] = useState(school?.reportNotes ?? '');
  const [saved, setSaved] = useState(false);

  if (!school) {
    return (
      <View className="flex-1 bg-white items-center justify-center p-8">
        <Text className="text-gray-500">École introuvable.</Text>
      </View>
    );
  }

  const currentStageIndex = pipelineStages.findIndex((s) => s.id === school.stage);
  const ristournes = school.subscriptions * focalReferralFcfa;

  const handleSave = async () => {
    await saveSchoolReport(school.id, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 py-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-1 mr-2">
          <ChevronLeft size={22} color="#111827" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>{school.name}</Text>
          <Text style={{ fontSize: 12, color: '#6B7280' }}>{school.city}</Text>
        </View>
        <View style={{ backgroundColor: '#EFF6FF' }} className="rounded-full px-3 py-1">
          <Text style={{ color: Brand.blue }} className="text-xs font-semibold">
            {stageLabel(school.stage)}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', marginBottom: 16 }}>
          {pipelineStages.map((stage, idx) => {
            const reached = idx <= currentStageIndex;
            return (
              <View key={stage.id} className="flex-row items-center">
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: reached ? Brand.blue : '#E5E7EB',
                  }}
                />
                <Text style={{ fontSize: 11, color: reached ? Brand.blue : '#9CA3AF', fontWeight: reached ? '700' : '400', marginLeft: 4, marginRight: 8 }}>
                  {stage.label}
                </Text>
                {idx < pipelineStages.length - 1 && (
                  <View style={{ width: 16, height: 1.5, backgroundColor: reached ? Brand.blue : '#E5E7EB', marginRight: 8 }} />
                )}
              </View>
            );
          })}
        </ScrollView>

        <View style={{ backgroundColor: '#FFF7ED', borderColor: '#FED7AA' }} className="border rounded-2xl p-4 mb-5">
          <Text style={{ color: '#C2410C' }} className="text-xs font-semibold mb-1">
            Action suggérée
          </Text>
          <Text style={{ color: '#9A3412' }} className="text-sm">
            {school.nextActionLabel}
          </Text>
        </View>

        <View className="border border-gray-200 rounded-2xl p-4 mb-4">
          <Text className="font-bold mb-3">Contact</Text>
          <View className="flex-row items-center gap-2 mb-1">
            <Text className="text-sm text-gray-700">{school.contactName}</Text>
          </View>
          <View className="flex-row items-center gap-2 mb-1">
            <Phone size={14} color="#6B7280" />
            <Text className="text-sm text-gray-700">{school.contactPhone}</Text>
          </View>
          <Text className="text-xs text-gray-500 mt-1">Dernier contact : {school.lastContactDate}</Text>
        </View>

        <View className="border border-gray-200 rounded-2xl p-4 mb-4">
          <Text className="font-bold mb-2">Prochaine action</Text>
          <Text className="text-sm text-gray-700">{school.nextActionLabel}</Text>
          <Text style={{ color: Brand.blue }} className="text-xs font-semibold mt-1">
            {school.nextActionDate}
          </Text>
        </View>

        <View className="border border-gray-200 rounded-2xl p-4 mb-4">
          <View className="flex-row items-center gap-2 mb-2">
            <TrendingUp size={16} color={Brand.blue} />
            <Text className="font-bold">Ristournes générées</Text>
          </View>
          <Text style={{ color: Brand.blue }} className="text-2xl font-bold mb-1">
            {ristournes} FCFA
          </Text>
          <Text className="text-xs text-gray-500">
            {focalReferralFcfa} FCFA × {school.subscriptions} abonnement{school.subscriptions > 1 ? 's' : ''}
          </Text>
        </View>

        <Text className="font-bold mb-2">Compte rendu</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Notes de visite, échanges avec le contact..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 12,
            padding: 14,
            fontSize: 14,
            color: '#111827',
            minHeight: 110,
            marginBottom: 12,
          }}
        />

        <TouchableOpacity
          onPress={handleSave}
          style={{ backgroundColor: saved ? '#15803D' : Brand.blue, borderRadius: 14, paddingVertical: 15, alignItems: 'center' }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>{saved ? 'Enregistré ✓' : 'Enregistrer'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
