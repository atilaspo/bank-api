export interface Account {
    id: number;
    owner: string;
    balance: number;
  };
  
  // temporary database
  export const accounts: Account[] = [];
  