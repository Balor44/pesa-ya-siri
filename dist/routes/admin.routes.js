"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
router.get('/admin/price', admin_controller_1.getCurrentPrice);
router.get('/admin/convert', admin_controller_1.convertPrice);
router.post('/admin/generate-cards', admin_controller_1.generateRechargeCards);
exports.default = router;
