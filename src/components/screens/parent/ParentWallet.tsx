import { CheckCircle2 } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { Child } from '@/data/family';
import { WithdrawModal } from '@/components/screens/parent/WithdrawModal';

export function ParentWallet() {
  const { familyChildren: children, walletTransactions } = useApp();
  const [withdrawChild, setWithdrawChild] = useState<Child | null>(null);

  const summary = useMemo(() => {
    const totalBalanceFcfa = children.reduce((sum, c) => sum + c.royaltiesFcfa, 0);
    const totalEarnedFcfa = walletTransactions
      .filter((tx) => tx.type === 'royalty')
      .reduce((sum, tx) => sum + tx.amountFcfa, 0);
    const totalWithdrawnFcfa = walletTransactions
      .filter((tx) => tx.type === 'retrait')
      .reduce((sum, tx) => sum + tx.amountFcfa, 0);
    return { totalBalanceFcfa, totalEarnedFcfa, totalWithdrawnFcfa };
  }, [children, walletTransactions]);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <View className="border border-gray-200 rounded-2xl p-5 mb-6">
        <Text className="text-sm text-gray-500 mb-1">Solde total</Text>
        <Text className="text-3xl font-bold mb-3">{summary.totalBalanceFcfa} FCFA</Text>
        <View className="flex-row gap-6">
          <View>
            <Text className="text-xs text-gray-500">Revenus générés</Text>
            <Text className="font-semibold mt-0.5">{summary.totalEarnedFcfa} FCFA</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-500">Retraits</Text>
            <Text className="font-semibold mt-0.5">{summary.totalWithdrawnFcfa} FCFA</Text>
          </View>
        </View>
      </View>

      <Text className="text-lg font-bold mb-3">Par enfant</Text>
      <View className="gap-3 mb-6">
        {children.map((child) => (
          <View key={child.id} className="flex-row items-center justify-between border border-gray-200 rounded-2xl p-4">
            <View>
              <Text className="font-semibold">{child.firstName}</Text>
              <Text style={{ color: Brand.blue }} className="font-bold mt-0.5">
                {child.royaltiesFcfa} FCFA
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setWithdrawChild(child)}
              disabled={child.royaltiesFcfa <= 0}
              style={{ borderColor: Brand.blue, opacity: child.royaltiesFcfa <= 0 ? 0.4 : 1 }}
              className="rounded-xl px-3 py-2 border"
            >
              <Text style={{ color: Brand.blue }} className="text-sm font-semibold">
                Retirer
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text className="text-lg font-bold mb-3">Historique</Text>
      <View className="gap-3">
        {walletTransactions.map((tx) => {
          const isRetrait = tx.type === 'retrait';
          return (
            <View key={tx.id} className="flex-row items-center justify-between border border-gray-200 rounded-2xl p-4">
              <View className="flex-1">
                <Text className="font-semibold">{isRetrait ? tx.label : `Royalty — ${tx.label}`}</Text>
                <Text className="text-xs text-gray-500 mt-0.5">
                  {children.find((c) => c.id === tx.childId)?.firstName} · {tx.date}
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className={isRetrait ? 'text-red-600 font-semibold' : 'text-green-700 font-semibold'}>
                  {isRetrait ? '-' : '+'}
                  {tx.amountFcfa} F
                </Text>
                {tx.paid && <CheckCircle2 size={16} color={isRetrait ? '#DC2626' : '#15803D'} />}
              </View>
            </View>
          );
        })}
      </View>

      <WithdrawModal child={withdrawChild} onClose={() => setWithdrawChild(null)} />
    </ScrollView>
  );
}
