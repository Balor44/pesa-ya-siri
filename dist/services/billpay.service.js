"use strict";
// MOCKED — will connect to Selcom or Beem Africa API later
// The function signatures stay the same when we go live
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillPayService = void 0;
const NETWORKS = ['Vodacom', 'Airtel', 'Tigo', 'Halotel'];
const CABLE_PROVIDERS = ['DSTV', 'GOTV', 'Azam TV'];
function generateReference() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ref = 'PYS-';
    for (let i = 0; i < 10; i++)
        ref += chars[Math.floor(Math.random() * chars.length)];
    return ref;
}
exports.BillPayService = {
    buyAirtime: async (phone, amount, network) => {
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
    payCableSubscription: async (smartcardNumber, amount, provider) => {
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
