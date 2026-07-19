"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const billpay_controller_1 = require("../controllers/billpay.controller");
const router = (0, express_1.Router)();
router.post('/buy-airtime', billpay_controller_1.buyAirtime);
router.post('/pay-cable', billpay_controller_1.payCable);
exports.default = router;
