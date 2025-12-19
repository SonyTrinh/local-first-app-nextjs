import Dexie, { type Table } from 'dexie';

const DB_NAME = 'RandomUserDB';

export interface User {
  uuid: string
  name: string;
  email: string;
  image: string;
  isFavorite: boolean; // Persisted local state
  pageFetched: number;
}

class UserDB extends Dexie {
  users!: Table<User>;

  constructor() {
    super(DB_NAME);
    
    // 'uuid' is the primary key
    // We index 'pageFetched' and 'isFavorite' for faster querying if needed
    this.version(2).stores({
      users: 'uuid, pageFetched, isFavorite' 
    });
  }
}

export const db = new UserDB();
