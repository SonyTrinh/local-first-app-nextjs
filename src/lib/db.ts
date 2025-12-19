import { User } from '@/types/user';
import Dexie, { type Table } from 'dexie';

const DB_NAME = 'RandomUserDB';

class UserDB extends Dexie {
  users!: Table<User>;

  constructor() {
    super(DB_NAME);
    
    // 'uuid' is the primary key
    this.version(1).stores({
      users: 'uuid, pageFetched' 
    });
  }
}

export const db = new UserDB();
