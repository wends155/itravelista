import { create } from 'zustand';

interface AppState {
  isOffline: boolean;
  isSidebarOpen: boolean;
  isGuestMode: boolean;
  setOffline: (offline: boolean) => void;
  toggleSidebar: () => void;
  setGuestMode: (guest: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOffline: false,
  isSidebarOpen: false,
  isGuestMode: false,
  setOffline: (offline) => set({ isOffline: offline }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setGuestMode: (guest) => set({ isGuestMode: guest }),
}));
