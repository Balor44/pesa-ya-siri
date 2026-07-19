// MOCKED — will connect to Selcom or Beem Africa API later
// The function signatures stay the same when we go live

const NETWORKS = ['Vodacom', 'Airtel', 'Tigo', 'Halotel'];
const CABLE_PROVIDERS = ['DSTV', 'GOTV', 'Azam TV'];

function generateReference(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = 'PYS-';
  for (let i = 0; i < 10; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export const BillPayService = {

  buyAirtime: async (phone: string, amount: number, network: string): Promise<{ success: boolean; reference: string; message: string }> => {
    if (!NETWORKS.includes(network)) {
      return { success: false, reference: '', message: 'Unsupported network. Choose: ' + NETWORKS.join(', ') };
    }
    const reference = generateReference();
    // TODO: replace with real Selcom/Beem API call
    return {
      success: true,
      reference,
      message: network + ' airtime of ' + amount.toLocaleString() + ' TZS sent to ' + phone,
    };
  },

  payCableSubscription: async (smartcardNumber: string, amount: number, provider: string): Promise<{ success: boolean; reference: string; message: string }> => {
    if (!CABLE_PROVIDERS.includes(provider)) {
      return { success: false, reference: '', message: 'Unsupported provider. Choose: ' + CABLE_PROVIDERS.join(', ') };
    }
    const reference = generateReference();
    // TODO: replace with real Selcom/Beem API call
    return {
      success: true,
      reference,
      message: provider + ' subscription of ' + amount.toLocaleString() + ' TZS paid for smartcard ' + smartcardNumber,
    };
  },

};