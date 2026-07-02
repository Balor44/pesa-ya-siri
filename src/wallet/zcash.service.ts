export const ZcashService = {

  generateAddress: async (): Promise<string> => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let addr = 'zs1';
    for (let i = 0; i < 76; i++) {
      addr += chars[Math.floor(Math.random() * chars.length)];
    }
    return addr;
  },

  getBalance: async (walletAddress: string): Promise<number> => {
    return 0;
  },

  sendZEC: async (fromAddr: string, toAddr: string, amount: number): Promise<string> => {
    const chars = 'abcdef0123456789';
    let txid = '';
    for (let i = 0; i < 64; i++) txid += chars[Math.floor(Math.random() * chars.length)];
    return txid;
  },

};