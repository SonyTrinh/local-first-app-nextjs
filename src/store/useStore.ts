import { create } from 'zustand';
import { db, User } from '@/lib/db';

interface AppState {
  users: User[];   
  currentPage: number;
  isLoading: boolean;
  isError: boolean;
  isOffline: boolean; 

  // Actions
  fetchUsers: (page: number) => Promise<void>;
  toggleFavorite: (uuid: string) => Promise<void>;
  setPage: (page: number) => void;
}

export const useStore = create<AppState>((set, get) => ({
  users: [],
  currentPage: 1,
  isLoading: true,
  isError: false,
  isOffline: false,

  fetchUsers: async (page: number, perPage = 10) => {
    set({ isLoading: true, isError: false });

    try {
      const cachedUsers = await db.users.where('pageFetched').equals(page).toArray();

      if (cachedUsers.length > 0) {
        const currentUsers = get().users;
        const newUsers = [
            ...currentUsers, 
            ...cachedUsers.filter(u => !currentUsers.find(cu => cu.uuid === u.uuid))
        ];
        
        set({ users: newUsers, isLoading: false, isOffline: false });
        return;
      }

      const res = await fetch(`https://randomuser.me/api/?page=${page}&results=${perPage}`);
      
      if (!res.ok) throw new Error('API Error');
      
      const data = await res.json();
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newUsers: User[] = data.results.map((u: any) => ({
        uuid: u.login.uuid,
        name: `${u.name.first} ${u.name.last}`,
        email: u.email,
        image: u.picture.large,
        isFavorite: false,
        pageFetched: page
      }));

      await db.users.bulkPut(newUsers);

      set((state) => ({
        users: [...state.users, ...newUsers],
        isLoading: false,
        isOffline: false
      }));

    } catch (error) {
      console.error('Fetch failed:', error);
    
      const allCached = await db.users.toArray();
      set({ 
        isLoading: false, 
        isError: true, 
        isOffline: true,
        users: allCached
      });
    }
  },

  toggleFavorite: async (uuid: string) => {
    set((state) => ({
      users: state.users.map((u) => 
        u.uuid === uuid ? { ...u, isFavorite: !u.isFavorite } : u
      )
    }));

    const user = await db.users.get(uuid);
    if (user) {
      await db.users.update(uuid, { isFavorite: !user.isFavorite });
    }
  },

  setPage: (page: number) => set({ currentPage: page }),
}));