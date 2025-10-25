import React, { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { UserDashboard } from "./components/UserDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { Toaster } from "./components/ui/sonner";

// Mock data types
export interface User {
  id: string;
  fullName: string;
  email: string;
  team: string;
  designation: string;
  isAdmin?: boolean;
  giftSent?: boolean;
  giftReceived?: boolean;
}

export interface Team {
  id: string;
  name: string;
}

export interface Designation {
  id: string;
  name: string;
}

export interface Pairing {
  giver: string;
  receiver: string;
}

// Mock data
const mockTeams: Team[] = [
  { id: "1", name: "Engineering" },
  { id: "2", name: "Design" },
  { id: "3", name: "Product" },
  { id: "4", name: "Marketing" },
  { id: "5", name: "Sales" },
];

const mockDesignations: Designation[] = [
  { id: "1", name: "Junior Developer" },
  { id: "2", name: "Senior Developer" },
  { id: "3", name: "Team Lead" },
  { id: "4", name: "Manager" },
  { id: "5", name: "Director" },
];

const mockUsers: User[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john@company.com",
    team: "Engineering",
    designation: "Senior Developer",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    email: "jane@company.com",
    team: "Design",
    designation: "Team Lead",
  },
  {
    id: "3",
    fullName: "Admin User",
    email: "admin@company.com",
    team: "Engineering",
    designation: "Manager",
    isAdmin: true,
  },
  {
    id: "4",
    fullName: "Bob Johnson",
    email: "bob@company.com",
    team: "Product",
    designation: "Junior Developer",
  },
  {
    id: "5",
    fullName: "Alice Brown",
    email: "alice@company.com",
    team: "Marketing",
    designation: "Manager",
  },
];

const mockPairings: Pairing[] = [
  { giver: "1", receiver: "2" },
  { giver: "2", receiver: "4" },
  { giver: "3", receiver: "5" },
  { giver: "4", receiver: "1" },
  { giver: "5", receiver: "3" },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "landing" | "user" | "admin"
  >("landing");
  const [currentUser, setCurrentUser] = useState<User | null>(
    null,
  );
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [designations, setDesignations] =
    useState<Designation[]>(mockDesignations);
  const [pairings, setPairings] =
    useState<Pairing[]>(mockPairings);
  const [isPairingComplete, setIsPairingComplete] =
    useState(false); // Set to false initially

  // Background music state
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Login function
  const handleLogin = (email: string, password: string) => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      setCurrentScreen(user.isAdmin ? "admin" : "user");
      return true;
    }
    return false;
  };

  // Registration function
  const handleRegister = (userData: Omit<User, "id">) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentScreen("user");
    return true;
  };

  // Logout function
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen("landing");
    setIsMusicPlaying(false);
  };

  // Get Secret Santa recipient for current user
  const getSecretSantaRecipient = () => {
    if (!currentUser || !isPairingComplete) return null;
    const pairing = pairings.find(
      (p) => p.giver === currentUser.id,
    );
    if (pairing) {
      return users.find((u) => u.id === pairing.receiver);
    }
    return null;
  };

  // Admin functions
  const updateUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === updatedUser.id ? updatedUser : u,
      ),
    );
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const addTeam = (name: string) => {
    const newTeam: Team = { id: Date.now().toString(), name };
    setTeams((prev) => [...prev, newTeam]);
  };

  const deleteTeam = (teamId: string) => {
    setTeams((prev) => prev.filter((t) => t.id !== teamId));
  };

  const addDesignation = (name: string) => {
    const newDesignation: Designation = {
      id: Date.now().toString(),
      name,
    };
    setDesignations((prev) => [...prev, newDesignation]);
  };

  const deleteDesignation = (designationId: string) => {
    setDesignations((prev) =>
      prev.filter((d) => d.id !== designationId),
    );
  };

  const initiatePairing = () => {
    // Simple pairing algorithm - shuffle users and pair them
    const userIds = users.map((u) => u.id);
    const shuffled = [...userIds].sort(
      () => Math.random() - 0.5,
    );
    const newPairings: Pairing[] = [];

    for (let i = 0; i < shuffled.length; i++) {
      const nextIndex = (i + 1) % shuffled.length;
      newPairings.push({
        giver: shuffled[i],
        receiver: shuffled[nextIndex],
      });
    }

    setPairings(newPairings);
    setIsPairingComplete(true);
  };

  const updateGiftStatus = (
    userId: string,
    field: "giftSent" | "giftReceived",
    value: boolean,
  ) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, [field]: value } : u,
      ),
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) =>
        prev ? { ...prev, [field]: value } : null,
      );
    }
  };

  const appProps = {
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
    isMusicPlaying,
    setIsMusicPlaying,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {currentScreen === "landing" && (
        <LandingPage
          onLogin={handleLogin}
          onRegister={handleRegister}
          teams={teams}
          designations={designations}
        />
      )}

      {currentScreen === "user" && currentUser && (
        <UserDashboard
          user={currentUser}
          users={users}
          teams={teams}
          designations={designations}
          secretSantaRecipient={getSecretSantaRecipient()}
          isPairingComplete={isPairingComplete}
          isMusicPlaying={isMusicPlaying}
          setIsMusicPlaying={setIsMusicPlaying}
          updateGiftStatus={updateGiftStatus}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === "admin" && currentUser && (
        <AdminDashboard
          user={currentUser}
          onLogout={handleLogout}
          {...appProps}
        />
      )}

      <Toaster />
    </div>
  );
}