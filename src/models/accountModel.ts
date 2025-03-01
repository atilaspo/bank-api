export type Account = {
    readonly id: number;
    owner: string;
    balance: number;
  };
  
  // temporary database
  export const accounts: Account[] = [];
  