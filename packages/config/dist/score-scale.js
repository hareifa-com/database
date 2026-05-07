"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SKILL_RATINGS = exports.EVALUATION_CATEGORIES = exports.SCORE_SCALE = void 0;
exports.SCORE_SCALE = {
    EXCELLENT: { min: 9, max: 10, label: 'ممتاز', labelEn: 'Excellent', color: 'green' },
    VERY_GOOD: { min: 8, max: 8.9, label: 'جيد جداً', labelEn: 'Very Good', color: 'blue' },
    GOOD: { min: 7, max: 7.9, label: 'جيد', labelEn: 'Good', color: 'yellow' },
    AVERAGE: { min: 6, max: 6.9, label: 'متوسط', labelEn: 'Average', color: 'orange' },
    BELOW_AVERAGE: { min: 4, max: 5.9, label: 'ضعيف', labelEn: 'Below Average', color: 'red' },
    POOR: { min: 1, max: 3.9, label: 'مقبول', labelEn: 'Poor', color: 'gray' },
};
exports.EVALUATION_CATEGORIES = {
    TECHNICAL_SKILLS: {
        key: 'technicalSkills',
        label: 'المهارات الفنية',
        labelEn: 'Technical Skills',
        weight: 0.3,
    },
    PHYSICAL_ATTRIBUTES: {
        key: 'physicalAttributes',
        label: 'الصفات البدنية',
        labelEn: 'Physical Attributes',
        weight: 0.25,
    },
    MENTAL_ASPECTS: {
        key: 'mentalAspects',
        label: 'الجوانب الذهنية',
        labelEn: 'Mental Aspects',
        weight: 0.25,
    },
    TACTICAL_UNDERSTANDING: {
        key: 'tacticalUnderstanding',
        label: 'الفهم التكتيكي',
        labelEn: 'Tactical Understanding',
        weight: 0.2,
    },
};
exports.SKILL_RATINGS = {
    BALL_CONTROL: { key: 'ballControl', label: 'التحكم بالكرة', labelEn: 'Ball Control' },
    PASSING: { key: 'passing', label: 'التمرير', labelEn: 'Passing' },
    SHOOTING: { key: 'shooting', label: 'التصويب', labelEn: 'Shooting' },
    DRIBBLING: { key: 'dribbling', label: 'المراوغة', labelEn: 'Dribbling' },
    HEADING: { key: 'heading', label: 'اللعب بالرأس', labelEn: 'Heading' },
    SPEED: { key: 'speed', label: 'السرعة', labelEn: 'Speed' },
    STAMINA: { key: 'stamina', label: 'التحمل', labelEn: 'Stamina' },
    STRENGTH: { key: 'strength', label: 'القوة', labelEn: 'Strength' },
    AGILITY: { key: 'agility', label: 'الخفة', labelEn: 'Agility' },
    CONCENTRATION: { key: 'concentration', label: 'التركيز', labelEn: 'Concentration' },
    DECISION_MAKING: { key: 'decisionMaking', label: 'اتخاذ القرار', labelEn: 'Decision Making' },
    CONFIDENCE: { key: 'confidence', label: 'الثقة بالنفس', labelEn: 'Confidence' },
    TEAMWORK: { key: 'teamwork', label: 'العمل الجماعي', labelEn: 'Teamwork' },
    POSITIONING: { key: 'positioning', label: 'التموضع', labelEn: 'Positioning' },
    GAME_READING: { key: 'gameReading', label: 'قراءة اللعب', labelEn: 'Game Reading' },
};
