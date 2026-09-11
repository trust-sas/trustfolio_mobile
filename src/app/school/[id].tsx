import { useLocalSearchParams } from 'expo-router';

import { SchoolDetail } from '@/components/screens/pointfocal/SchoolDetail';

export default function SchoolDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <SchoolDetail schoolId={id} />;
}
