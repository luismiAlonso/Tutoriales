import { create } from 'zustand'

interface NotificationsStore {
  notifications: { message: string; type: 'error' | 'info' }[];
  addNotification: (notification: { message: string; type: 'error' | 'info' }) => void;
  setNotifications: (newNotifications: { message: string; type: 'error' | 'info' }[]) => void;
}

const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  setNotifications: (newNotifications) => set({ notifications: newNotifications }),
}));

export default useNotificationsStore;
