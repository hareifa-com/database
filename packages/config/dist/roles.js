"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS = exports.USER_ROLES = void 0;
exports.USER_ROLES = {
    ADMIN: { value: 'admin', label: 'مسؤول', labelEn: 'Admin', permissions: ['*'] },
    COACH: { value: 'coach', label: 'مدرب', labelEn: 'Coach', permissions: ['players:read', 'players:evaluate', 'evaluations:read', 'evaluations:create'] },
    SCOUT: { value: 'scout', label: 'كشاف', labelEn: 'Scout', permissions: ['players:read', 'players:create', 'evaluations:read', 'evaluations:create', 'scouting:read', 'scouting:create'] },
    ACADEMY_DIRECTOR: { value: 'academy_director', label: 'مدير أكاديمية', labelEn: 'Academy Director', permissions: ['academy:read', 'academy:update', 'players:read', 'players:create', 'players:update', 'evaluations:read', 'evaluations:create', 'reports:read'] },
    PLAYER: { value: 'player', label: 'لاعب', labelEn: 'Player', permissions: ['profile:read', 'profile:update'] },
};
exports.PERMISSIONS = {
    // Player permissions
    'players:read': { label: 'عرض اللاعبين', labelEn: 'Read Players' },
    'players:create': { label: 'إضافة لاعب', labelEn: 'Create Player' },
    'players:update': { label: 'تعديل لاعب', labelEn: 'Update Player' },
    'players:delete': { label: 'حذف لاعب', labelEn: 'Delete Player' },
    'players:evaluate': { label: 'تقييم لاعب', labelEn: 'Evaluate Player' },
    // Evaluation permissions
    'evaluations:read': { label: 'عرض التقييمات', labelEn: 'Read Evaluations' },
    'evaluations:create': { label: 'إنشاء تقييم', labelEn: 'Create Evaluation' },
    'evaluations:update': { label: 'تعديل تقييم', labelEn: 'Update Evaluation' },
    'evaluations:delete': { label: 'حذف تقييم', labelEn: 'Delete Evaluation' },
    // Academy permissions
    'academy:read': { label: 'عرض الأكاديمية', labelEn: 'Read Academy' },
    'academy:update': { label: 'تعديل الأكاديمية', labelEn: 'Update Academy' },
    'academy:create': { label: 'إنشاء أكاديمية', labelEn: 'Create Academy' },
    // Scouting permissions
    'scouting:read': { label: 'عرض التقارير', labelEn: 'Read Scouting Reports' },
    'scouting:create': { label: 'إنشاء تقرير', labelEn: 'Create Scouting Report' },
    // Reports permissions
    'reports:read': { label: 'عرض التقارير', labelEn: 'Read Reports' },
    'reports:create': { label: 'إنشاء تقرير', labelEn: 'Create Report' },
    // Profile permissions
    'profile:read': { label: 'عرض الملف الشخصي', labelEn: 'Read Profile' },
    'profile:update': { label: 'تعديل الملف الشخصي', labelEn: 'Update Profile' },
    // Admin permissions
    '*': { label: 'كل الصلاحيات', labelEn: 'All Permissions' },
};
