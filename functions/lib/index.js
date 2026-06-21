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
Object.defineProperty(exports, "__esModule", { value: true });
exports.onLeadCreated = void 0;
const functions = __importStar(require("firebase-functions/v1"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
function getBrevoApiKey() {
    var _a;
    const config = functions.config();
    return ((_a = config.brevo) === null || _a === void 0 ? void 0 : _a.api_key) || process.env.BREVO_API_KEY || '';
}
function getBrevoSenderEmail() {
    var _a;
    const config = functions.config();
    return ((_a = config.brevo) === null || _a === void 0 ? void 0 : _a.sender_email) || process.env.BREVO_SENDER_EMAIL || 'no-reply@globaltradingacademy.com';
}
function getNotificationEmail() {
    var _a;
    const config = functions.config();
    return ((_a = config.notification) === null || _a === void 0 ? void 0 : _a.email) || process.env.NOTIFICATION_EMAIL || '';
}
function getInviteLink() {
    var _a;
    const config = functions.config();
    return ((_a = config.invite) === null || _a === void 0 ? void 0 : _a.link) || process.env.INVITE_LINK || 'https://globaltradingacademy.github.io/';
}
async function sendBrevoEmail(to, subject, html) {
    const apiKey = getBrevoApiKey();
    if (!apiKey) {
        throw new Error('Brevo API key is not configured');
    }
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
        },
        body: JSON.stringify({
            sender: {
                name: 'Global Trading Academy',
                email: getBrevoSenderEmail(),
            },
            to: [{ email: to }],
            subject,
            html,
        }),
    });
    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Brevo request failed ${response.status}: ${body}`);
    }
}
exports.onLeadCreated = functions.firestore
    .document('leads/{leadId}')
    .onCreate(async (snap) => {
    const lead = snap.data();
    const notificationEmail = getNotificationEmail();
    if (!notificationEmail) {
        functions.logger.warn('NOTIFICATION_EMAIL not configured — skipping owner notification');
    }
    else {
        const ownerHtml = `
        <h2>New Lead — Global Trading Academy</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #eee;">${lead.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #eee;">${lead.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #eee;">${lead.phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">City</td><td style="padding:8px;border:1px solid #eee;">${lead.city}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Occupation</td><td style="padding:8px;border:1px solid #eee;">${lead.occupation}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Course</td><td style="padding:8px;border:1px solid #eee;">${lead.course}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #eee;">${lead.message}</td></tr>
        </table>
      `;
        try {
            await sendBrevoEmail(notificationEmail, `New Lead: ${lead.name} — ${lead.course}`, ownerHtml);
            functions.logger.info('Owner notification sent', { leadId: snap.id });
        }
        catch (error) {
            functions.logger.error('Failed to send owner notification', error);
        }
    }
    if (lead.email) {
        const inviteLink = getInviteLink();
        const userHtml = `
        <h2>Thanks for contacting Global Trading Academy</h2>
        <p>Hi ${lead.name},</p>
        <p>We received your inquiry for <strong>${lead.course}</strong>. Our team will contact you soon.</p>
        <p>Click the link below to get started:</p>
        <p><a href="${inviteLink}" style="color:#2563eb">${inviteLink}</a></p>
        <p>Best regards,<br/>Global Trading Academy</p>
      `;
        try {
            await sendBrevoEmail(lead.email, 'Your invitation from Global Trading Academy', userHtml);
            functions.logger.info('Invitation email sent to lead', { leadId: snap.id, email: lead.email });
        }
        catch (error) {
            functions.logger.error('Failed to send invitation email to lead', { leadId: snap.id, error });
        }
    }
    return null;
});
//# sourceMappingURL=index.js.map