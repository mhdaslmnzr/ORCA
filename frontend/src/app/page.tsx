'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import PREDATORDashboard from '@/components/dashboard/PREDATORDashboard';

export default function Home() {
  return (
    <DashboardLayout>
      <PREDATORDashboard />
    </DashboardLayout>
  );
}
