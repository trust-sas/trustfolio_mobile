import { X } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { Child } from '@/data/family';

type Channel = 'orange' | 'mtn';

export function WithdrawModal({ child, onClose }: { child: Child | null; onClose: () => void }) {
  const { withdrawFcfa } = useApp();
  const [channel, setChannel] = useState<Channel>('orange');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [done, setDone] = useState(false);

  const visible = child !== null;
  const max = child?.royaltiesFcfa ?? 0;
  const amountValue = Number(amount);
  const canSubmit = phone.trim().length >= 8 && amountValue > 0 && amountValue <= max;

  const reset = () => {
    setChannel('orange');
    setPhone('');
    setAmount('');
    setDone(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
          {!done ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>Retrait — {child?.firstName}</Text>
                <TouchableOpacity onPress={handleClose} className="p-1">
                  <X size={20} color="#111827" />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
                {(
                  [
                    { id: 'orange' as Channel, label: 'Orange Money', color: '#FF6B00' },
                    { id: 'mtn' as Channel, label: 'MTN Mobile Money', color: '#FFCC00' },
                  ]
                ).map((opt) => {
                  const active = channel === opt.id;
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      onPress={() => setChannel(opt.id)}
                      style={{
                        flex: 1,
                        borderWidth: 1.5,
                        borderColor: active ? Brand.blue : '#E5E7EB',
                        backgroundColor: active ? '#EFF6FF' : '#FFFFFF',
                        borderRadius: 12,
                        padding: 12,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: opt.color }} />
                      <Text style={{ fontSize: 13, fontWeight: '600', color: '#111827' }}>{opt.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>Numéro de téléphone</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="+225 07 XX XX XX"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 16 }}
              />

              <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>
                Montant (max {max} FCFA)
              </Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="Ex: 300"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 20 }}
              />

              <TouchableOpacity
                onPress={async () => {
                  if (!canSubmit || !child) return;
                  await withdrawFcfa(child.id, amountValue, channel);
                  setDone(true);
                }}
                disabled={!canSubmit}
                style={{
                  backgroundColor: canSubmit ? Brand.blue : '#D1D5DB',
                  borderRadius: 14,
                  paddingVertical: 15,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>Continuer</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={{ alignItems: 'center', paddingVertical: 24 }}>
              <Text style={{ fontSize: 48, marginBottom: 16 }}>⏳</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 8, textAlign: 'center' }}>
                Demande de retrait enregistrée
              </Text>
              <Text style={{ fontSize: 13, color: '#6B7280', textAlign: 'center', marginBottom: 20 }}>
                Ceci est une simulation — aucun transfert d'argent réel n'a eu lieu. Le retrait vers {channel === 'orange' ? 'Orange Money' : 'MTN Mobile Money'} sera activé une fois un prestataire de paiement connecté (Phase 6 du plan).
              </Text>
              <TouchableOpacity onPress={handleClose} style={{ backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}>Fermer</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
