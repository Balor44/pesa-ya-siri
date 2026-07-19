"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletService = getWalletService;
const zcash_service_1 = require("./zcash.service");
const stellar_service_1 = require("./stellar.service");
function getWalletService(chain) {
    switch (chain) {
        case 'zcash': return zcash_service_1.ZcashService;
        case 'stellar': return stellar_service_1.StellarService;
        default: throw new Error('Unsupported chain: ' + chain);
    }
}
