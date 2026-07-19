"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const config_1 = require("../config");
exports.server = new stellar_sdk_1.Horizon.Server(config_1.horizonUrl);
