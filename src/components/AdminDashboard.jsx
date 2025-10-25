import React, { useState } from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger 
} from './ui/sidebar';
import { Button } from './ui/button';
import { 
  Users, 
  Building2, 
  Briefcase, 
  Shuffle, 
  BarChart3, 
  Download, 
  Gift, 
  LogOut,
  TreePine 
} from 'lucide-react';
import { UserManagement } from './admin/UserManagement.jsx';
import { MasterData } from './admin/MasterData.jsx';
import { PairingControl } from './admin/PairingControl.jsx';
import { Analytics } from './admin/Analytics.jsx';
import { ExportData } from './admin/ExportData.jsx';

export function AdminDashboard({
  user,
  users,
  teams,
  designations,
  pairings,
  isPairingComplete,
  updateUser,
  deleteUser,
  addTeam,
  deleteTeam,
  addDesignation,
  deleteDesignation,
  initiatePairing,
  onLogout
}) {
  const [activeSection, setActiveSection] = useState('users');

  const menuItems = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'masterdata', label: 'Master Data', icon: Building2 },
    { id: 'pairing', label: 'Pairing Control', icon: Shuffle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'export', label: 'Export Data', icon: Download },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return (
          <UserManagement 
            users={users}
            teams={teams}
            designations={designations}
            onUpdateUser={updateUser}
            onDeleteUser={deleteUser}
          />
        );
      case 'masterdata':
        return (
          <MasterData 
            teams={teams}
            designations={designations}
            onAddTeam={addTeam}
            onDeleteTeam={deleteTeam}
            onAddDesignation={addDesignation}
            onDeleteDesignation={deleteDesignation}
          />
        );
      case 'pairing':
        return (
          <PairingControl 
            users={users}
            pairings={pairings}
            isPairingComplete={isPairingComplete}
            onInitiatePairing={initiatePairing}
          />
        );
      case 'analytics':
        return (
          <Analytics 
            users={users}
            teams={teams}
            designations={designations}
          />
        );
      case 'export':
        return (
          <ExportData users={users} />
        );
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-red-50 via-white to-green-50">
        <Sidebar className="border-r bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6 text-red-600" />
              <div>
                <h2 className="font-bold text-lg text-gray-900">Admin Panel</h2>
                <p className="text-sm text-gray-600">Secret Santa Management</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-3 py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            <div className="mt-auto pt-4 border-t">
              <div className="px-3 py-2 text-sm text-gray-600">
                <p className="font-medium">{user.fullName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={onLogout}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-white/80 backdrop-blur-sm px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <TreePine className="w-5 h-5 text-green-600" />
              <h1 className="font-semibold text-lg">
                {menuItems.find(item => item.id === activeSection)?.label}
              </h1>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}