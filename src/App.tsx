import { useState } from 'react';
import type { Page } from '@/types';
import RoleSelect from '@/components/RoleSelect';
import ConsumerScan from '@/components/ConsumerScan';
import ConsumerResult from '@/components/ConsumerResult';
import Landing from '@/components/Landing';
import Sidebar from '@/components/Sidebar';
import MfrSidebar from '@/components/MfrSidebar';
import Topbar from '@/components/Topbar';
import Dashboard from '@/components/Dashboard';
import Scanner from '@/components/Scanner';
import Result from '@/components/Result';
import Inspections from '@/components/Inspections';
import Reports from '@/components/Reports';
import MfrDashboard from '@/components/MfrDashboard';
import MfrCheck from '@/components/MfrCheck';
import MfrResult from '@/components/MfrResult';
import MfrFixes from '@/components/MfrFixes';

function App() {
  const [page, setPage] = useState<Page>('role-select');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    setMobileSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  if (page === 'role-select') {
    return <RoleSelect onNavigate={navigate} />;
  }

  if (page === 'consumer') {
    return <ConsumerScan onNavigate={navigate} />;
  }

  if (page === 'consumer-result') {
    return <ConsumerResult onNavigate={navigate} />;
  }

  if (page === 'landing') {
    return <Landing onNavigate={navigate} />;
  }

  const isManufacturer = page.startsWith('mfr-');

  return (
    <div className="min-h-screen bg-navy-50/30 flex">
      {isManufacturer ? (
        <MfrSidebar
          current={page}
          onNavigate={navigate}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
      ) : (
        <Sidebar
          current={page}
          onNavigate={navigate}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
      )}
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar onOpenMobile={() => setMobileSidebarOpen(true)} current={page} />
        <main className="flex-1">
          {page === 'dashboard' && <Dashboard onNavigate={navigate} />}
          {page === 'scanner' && <Scanner onNavigate={navigate} />}
          {page === 'result' && <Result onNavigate={navigate} />}
          {page === 'inspections' && <Inspections onNavigate={navigate} />}
          {page === 'reports' && <Reports onNavigate={navigate} />}
          {page === 'mfr-dashboard' && <MfrDashboard onNavigate={navigate} />}
          {page === 'mfr-check' && <MfrCheck onNavigate={navigate} />}
          {page === 'mfr-result' && <MfrResult onNavigate={navigate} />}
          {page === 'mfr-fixes' && <MfrFixes onNavigate={navigate} />}
        </main>
      </div>
    </div>
  );
}

export default App;
