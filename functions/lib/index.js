"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onLeadCreated = void 0;
const functions = __importStar(require("firebase-functions/v1"));
const admin = __importStar(require("firebase-admin"));
const nodemailer_1 = __importDefault(require("nodemailer"));
admin.initializeApp();
function getSmtpConfig() {
    const config = functions.config().smtp || {};
    return {
        host: config.host || process.env.SMTP_HOST,
        port: Number(config.port || process.env.SMTP_PORT || 587),
        secure: config.secure === 'true' || process.env.SMTP_SECURE === 'true',
        auth: {
            user: config.user || process.env.SMTP_USER,
            pass: config.pass || process.env.SMTP_PASS,
        },
    };
}
function getNotificationEmail() {
    var _a;
    const config = functions.config();
    return ((_a = config.notification) === null || _a === void 0 ? void 0 : _a.email) || process.env.NOTIFICATION_EMAIL || '';
}
exports.onLeadCreated = functions.firestore
    .document('leads/{leadId}')
    .onCreate(async (snap) => {
    const lead = snap.data();
    const notificationEmail = getNotificationEmail();
    if (!notificationEmail) {
        functions.logger.warn('NOTIFICATION_EMAIL not configured — skipping email');
        return null;
    }
    const smtpConfig = getSmtpConfig();
    if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
        functions.logger.warn('SMTP credentials not configured — skipping email');
        return null;
    }
    const transporter = nodemailer_1.default.createTransport(smtpConfig);
    const html = `
      <h2>New Lead — National Trading Academy</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #eee;">${lead.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #eee;">${lead.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">City</td><td style="padding:8px;border:1px solid #eee;">${lead.city}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Occupation</td><td style="padding:8px;border:1px solid #eee;">${lead.occupation}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Course</td><td style="padding:8px;border:1px solid #eee;">${lead.course}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #eee;">${lead.message}</td></tr>
      </table>
    `;
    try {
        await transporter.sendMail({
            from: `"National Trading Academy" <${smtpConfig.auth.user}>`,
            to: notificationEmail,
            subject: `New Lead: ${lead.name} — ${lead.course}`,
            html,
        });
        functions.logger.info('Lead notification email sent', { leadId: snap.id });
    }
    catch (error) {
        functions.logger.error('Failed to send lead notification email', error);
    }
    return null;
});
//# sourceMappingURL=index.js.map